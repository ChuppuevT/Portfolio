export const createTable = (dateName, valueName, mas) => {
    let indDate = [];
    let indVal = [];
    let masDate = [];

    for (let i = 0; i < mas[0].length; i++) {
        if (mas[0][i] == dateName || mas[0][i] == valueName) {
            if (mas[0][i] == dateName) {
                indDate = i;
            }
            else indVal = i;
        }
    }

    if (indDate == null || indVal == null) {
        alert("Кажется где-то возникла ошибка! Проверьте правильно ли введены имена полей!")

    }
    else {
        
        if (indDate == null || indVal == null) {
            alert("Кажется где-то возникла ошибка! Проверьте правильно ли введены имена полей!")
    
        }
        if (indDate.length != indVal.length) {
            alert("Не должно быть данных разной длины!")
        }
        else {
            for (let j = 1; j < mas.length; j++) {
                masDate.push({ date: mas[j][indDate], value: mas[j][indVal] });
            }
        }
    }

    return masDate;
}