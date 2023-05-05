
//convert date to localeString
export const  dateConvert = (input) => {
    let inputDate = new Date(input);
    return inputDate.toLocaleDateString('en-CA');
};

//increment date 
//returns in iso string
export const decrementDate = (currentDate) => {
    let dateObj = new Date (currentDate);
    dateObj.setDate(dateObj.getDate()-1);
    return dateObj.toISOString();
}

//increment date 
//returns in iso string
export const incrementDate = (currentDate) => {
    let dateObj = new Date (currentDate);
    dateObj.setDate(dateObj.getDate()+1);
    return dateObj.toISOString();
}