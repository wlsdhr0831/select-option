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
    {value : false, text: "1"},
    {value : false, text: "2"},
    {value : false, text: "3"},
    {value : false, text: "4"},
    {value : false, text: "5"},
];

const select = new SelectObject({ total: false, optionList });

const app = document.getElementById("app");

const selectBox = document.createElement('div');
app.append(selectBox);

const totalBox = document.createElement('div');
selectBox.append(totalBox);

const total = document.createElement('input');
total.type = 'checkbox';
total.id = 'total';

const totalLabel = document.createElement('label');
totalLabel.innerText = '전체 선택';
totalLabel.htmlFor = 'total';

totalBox.append(total);
totalBox.append(totalLabel);

const optionBox = document.createElement('div');
selectBox.append(optionBox);

optionList.forEach((e, idx) => {
    const element = document.createElement('input');
    element.id = idx;
    element.className = 'option';
    element.type = 'checkbox';
    element.checked = e.value;

    const elementLabel = document.createElement('label');
    elementLabel.innerText = e.text;
    elementLabel.htmlFor = idx;

    optionBox.append(element);
    optionBox.append(elementLabel);
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


