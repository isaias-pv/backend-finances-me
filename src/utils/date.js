import moment from "moment";

const convertDateToSaveDB = function (date = new Date().getTime()) {
	return moment(date).format("YYYY-MM-DD");
};


export {
	convertDateToSaveDB
}