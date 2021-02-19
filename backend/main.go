package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"strconv"
)

//Result define the result of calculator
type Result struct {
	Number1   string
	Number2   string
	Symbol    string
	ScreenVal string
}

//Response define the struct of Response
type Response struct {
	Code int
	Msg  string
	Data Result
}

func main() {
	http.HandleFunc("/calculator", handlePostJSON)
	fmt.Println("Start listening at port : 8002.")
	log.Fatal(http.ListenAndServe("localhost:8002", nil))
}

func handlePostJSON(w http.ResponseWriter, req *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("content-type", "application/json")
	ret := new(Response)

	defer func() {
		err := recover()
		if err != nil {
			fmt.Println("err=", err)
			ret.Code = 1
			ret.Msg = "Failed"
			jsonStr, _ := json.Marshal(ret)
			fmt.Fprintf(w, string(jsonStr))
		}
	}()

	decoder := json.NewDecoder(req.Body)
	var params map[string]string
	decoder.Decode(&params)

	sSymbol := []string{"%", "1/x", "x²", "√x"}
	//dSymbol := []string{"+", "-", "×", "÷"}
	var calRet Result
	calRet.Number1 = params["number1"]
	calRet.Number2 = params["number2"]
	calRet.Symbol = params["symbol"]
	calRet.ScreenVal = params["screenVal"]

	if indexOf(sSymbol, params["symbol"]) != -1 {
		if params["number2"] != "" {
			r := strconv.FormatFloat(calNum(params["symbol"], params["number2"]), 'f', -1, 64)
			calRet.Number2 = r
			calRet.ScreenVal = r
		} else {
			r := strconv.FormatFloat(calNum(params["symbol"], params["number1"]), 'f', -1, 64)
			calRet.Number1 = r
			calRet.ScreenVal = r
		}
		if params["symbol"] == "%" {
			calRet.Symbol = "%%"
		}
	} else {
		r := strconv.FormatFloat(calNum(params["symbol"], params["number1"], params["number2"]), 'f', -1, 64)
		calRet.Number1 = r
		calRet.Number2 = ""
		calRet.ScreenVal = r
		calRet.Symbol = ""
	}

	ret.Code = 0
	ret.Msg = "success"
	ret.Data = calRet
	retJSON, _ := json.Marshal(ret)

	fmt.Fprintf(w, string(retJSON))
}

func indexOf(s []string, t string) int {
	for i, x := range s {
		if t == x {
			return i
		}
	}
	return -1
}

func calNum(symbol string, nums ...string) float64 {
	var ret float64
	if len(nums) == 1 {
		param, _ := strconv.ParseFloat(nums[0], 64)
		switch symbol {
		case "%":
			ret = param / 100
			fmt.Printf("Calculator result : %f%%\n", ret)
		case "1/x":
			ret = 1 / param
			fmt.Printf("Calculator result : 1 / %f = %f\n", param, ret)
		case "x²":
			ret = math.Pow(param, 2)
			fmt.Printf("Calculator result : sqr(%f) = %f\n", param, ret)
		case "√x":
			ret = math.Sqrt(param)
			fmt.Printf("Calculator result : √%f = %f\n", param, ret)
		}
	} else {
		param1, _ := strconv.ParseFloat(nums[0], 64)
		param2, _ := strconv.ParseFloat(nums[1], 64)
		switch symbol {
		case "＋":
			ret = param1 + param2
			fmt.Printf("Calculator result : %f + %f = %f\n", param1, param2, ret)
		case "－":
			ret = param1 - param2
			fmt.Printf("Calculator result : %f - %f = %f\n", param1, param2, ret)
		case "×":
			ret = param1 * param2
			fmt.Printf("Calculator result : %f × %f = %f\n", param1, param2, ret)
		case "÷":
			ret = param1 / param2
			fmt.Printf("Calculator result : %f ÷ %f = %f\n", param1, param2, ret)
		}
	}
	return ret
}
