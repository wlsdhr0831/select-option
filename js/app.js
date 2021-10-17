class SelectObject {
    constructor({ total, optionList }) {
        this.total = total;
        this.size = optionList.length;
        this.optionList = optionList;
    }

    setSelectObject(object){
        return new SelectObject(object);
    }

    selectAllOptions() {
        this.total = true;
        this.optionList.forEach(option => {
            option.value = true;
        });
    }

    deselectAllOPtions() {
        this.total = false;
        this.optionList.forEach(option => {
            option.value = false;
        });
    }

    selectOption(idx) {
        this.optionList[idx].value = true;
    
        if(this.isSelectedAll()) {
            this.total = true;
        }
    }   

    deselectOption(idx) {
        this.optionList[idx].value = false;
        this.total = false;
    }  

    isSelectedAll() {
        let cnt = 0;
        this.optionList.forEach(option => {
            if(option.value) cnt++;
        })
    
        if(cnt === this.size) return true;
        else return false;
    }
}

const optionList = [
    {value : false, text: "이용약관동의 (필수)"},
    {value : false, text: "개인정보수집이용 동의 (필수)"},
    {value : false, text: "만 14세 이상 확인 (필수)"},
    {value : false, text: "알림이용 (선택)"},
    {value : false, text: "위치기반서비스 동의 (선택)"},
];

const select = new SelectObject({ total: false, optionList });

const app = document.getElementById("app");

const selectBox = document.createElement('div');
selectBox.className = 'selectBox';
app.append(selectBox);

const totalBox = document.createElement('div');
totalBox.className = 'totalBox';
selectBox.append(totalBox);

const totalLabel = document.createElement('label');
totalLabel.innerText = '전체약관 동의';
totalLabel.htmlFor = 'total';

const total = document.createElement('input');
total.type = 'checkbox';
total.id = 'total';

totalBox.append(totalLabel);
totalBox.append(total);

const optionBox = document.createElement('div');
selectBox.append(optionBox);

optionList.forEach((e, idx) => {
    const elementBox = document.createElement('div');
    elementBox.className = 'elementBox';

    const elementLabel = document.createElement('label');
    elementLabel.innerText = e.text;
    elementLabel.htmlFor = idx;

    const element = document.createElement('input');
    element.id = idx;
    element.className = 'option';
    element.type = 'checkbox';
    element.checked = e.value;

    optionBox.append(elementBox);
    elementBox.append(elementLabel);
    elementBox.append(element);
});

const changeOption = () => {
    total.checked = select.total;
    
    document.querySelectorAll('.option').forEach((e, idx) => {
        e.checked = select.optionList[idx].value;
    });
}

const input = document.querySelectorAll('input');

input.forEach(i => {
    i.addEventListener("change", (e) => {
        if(e.target.id === "total"){
            e.target.checked
                ? select.selectAllOptions() 
                : select.deselectAllOPtions();
        }else{
            e.target.checked
                ? select.selectOption(e.target.id) 
                : select.deselectOption(e.target.id);
        }

        changeOption();
    });
})


