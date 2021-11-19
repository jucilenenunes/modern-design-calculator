const $ = document.getElementById.bind(document);

let memory;

const operators = ["+", "-", "*", "/"];

function Equal() {
    calc()
    $("res").value = memory;
    $("result").innerText = memory;
    $("value").innerText = memory;
}

function backspace() {
    let save = $("res").value;
    let value = $("value").innerText;

    if (save.length > 1) {
        let sub = value.slice(0, save.length - 1);
        $("value").innerText = sub;
        $("res").value = sub;
        calc();
    } else if (save.length === 1) {
        reset();
    } else {
        reset();
    }
}

function btnKey(num) {
    let save = $("res").value;

    if (save === "ERROR!") return reset();

    if (
        operators.includes(save[save.length - 1]) &&
        operators.includes(num) &&
        save.length !== "-"
    ) {
        $("value").innerText = save.slice(0, save.length - 1) + num;
        return ($("res").value = save.slice(0, save.length - 1) + num);
    }

    $("res").value = save + num;
    $("value").innerText = save + num;

    calc();
}

function calc() {
    let result = $("res").value;

    if (
        result === "ERROR!" ||
        (operators.includes(result) && result !== "-")
    ) {
        return reset();
    }

    let resDisplay;

    if (operators.includes(result.slice(-1)) && result !== "-") {
        let valueNormalize = result.slice(0, result.length - 1);
        resDisplay = eval(valueNormalize);
    } else {
        resDisplay = eval(result);
    }

    if (
        resDisplay === undefined ||
        resDisplay === Infinity ||
        Number.isNaN(resDisplay) ||
        resDisplay === -Infinity
    ) {
        $("result").innerText = "ERROR!";
    } else {
        $("result").innerText = resDisplay;
        memory = resDisplay
    }
}

function reset() {
    $("res").value = "";
    $("result").innerText = "";
    $("value").innerText = "";
}
