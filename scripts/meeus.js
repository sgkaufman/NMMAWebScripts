// Code in this file hadles HTML IO, and uses functions in meeusMath.js
// to perform the calculations.

function computeHMS() {
  const formMembers = document.getElementById("hms-form");
  const dateControl = formMembers.elements["degreesToHMS"];
  const degreeNum = dateControl.valueAsNumber;
  
  [hr, min, sec] = degreesToHMS(degreeNum);
  const outField = formMembers.elements["convertedHMS"];
  outField.value = hr + ":" + min + ":" + sec.toPrecision(3);
}

function computejd () {
  const formMembers = document.getElementById("jd-form");
  const dateControl = formMembers.elements["gregorianDate"];
  const dateNum = dateControl.valueAsNumber;
  let gregorianDate = new Date();
  gregorianDate.setTime(dateNum);
        
  // Months and days from the Date object are indexed from zero
  const gregorianYear = gregorianDate.getFullYear();
  let year = gregorianYear;
        
  const gregorianMonth = gregorianDate.getMonth();
  let month = gregorianMonth + 1;
        
  const gregorianDay = gregorianDate.getDate();
  let day = gregorianDay + 1;
        
  let julianDay = jdFromGregorianCalendar(year, month, day);
                        
  console.log("JD = " + julianDay);
  const outField = formMembers.elements["julianDay"];

  outField.value = julianDay;
}

function computegd () {
  const formMembers = document.getElementById("jd-to-cal-form");
  const dateControl = formMembers.elements["desired-julian-day"];
  // console.log(dateControl);
  let jdText = dateControl.value;
  //console.log(jdText);
  let julianDate = parseFloat(jdText);
  //console.log(julianDate);
  if (isNaN(julianDate)) console.log ('JulianDate Not a number');
  // Need also to check that the number is non-negative.
  else {
    [day, month, year] = calendarDateFromJD(julianDate);
    console.log(year + '-' + month + '-' + day);
  }
}

function computeEaster () {
  const formMembers = document.getElementById("easter-form");
  const yearControl = formMembers.elements["year-of-easter"];
  console.log(yearControl);
  let yearText = yearControl.value;
  console.log(yearText);
  let easterYear = parseInt(yearText, 10);
  console.log(easterYear);
  let day, month;
  [month, day] = gregorianEasterDate(easterYear);
  console.log(month + "-" + day);
  
}
