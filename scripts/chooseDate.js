// Much of this code is from 
// https://code-boxx.com/simple-datepicker-pure-javascript-css
// This is a modified version of that sites"datepicker.js".

var picker = {
    // (A) ATTACH DATEPICKER TO TARGET
    // Original instance vars:
    //  target: field to populate
    //  container: generate datepicker in here (for inline datepicker)
    //  startmon: start on mon? (optional, default false) - DELETED
    //  yrange: year select range (optional, default 10)  - DELETED
    //  disableday: days to disable, e.g. [2,7] to disable tue and sun (optional) 
    //							  - DELETED
    //
    // This version's instance vars:
    //  target: field to populate
    //  container: generate datepicker in here (for inline datepicker)
    //  startYear: year to begin choices *** UNIMPLEMENTED ***
    // 	startMonth: month to begin choices (1-12) *** UNIMPLEMENTED ***
    //  startDay: day to begin choices *** UNIMPLEMENTED ***
    //  onpick : function to  call on select date (optional)
    
    instances : [],
    attach : (opt) => {
	// (A1) SET DEFAULT OPTIONS & REGISTER INSTANCE
	opt.target = document.getElementById(opt.target);
	opt.target.readOnly = true; // PREVENT ONSCREEN KEYBOARD
	if (opt.container) {
	    opt.container = document.getElementById(opt.container);
		       }
      
	const id = picker.instances.length;
	picker.instances.push(opt);
	let inst = picker.instances[id];

	// (A2) TEMP VARS + CURRENT MONTH YEAR (UTC+0)
	let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            temp, today = new Date(),
            thisMonth = today.getUTCMonth(), // JAN IS 0
            thisYear = today.getUTCFullYear();

	// (A3) GENERATE HTML
	// (A3-1) HTML DATEPICKER WRAPPER
	inst.hPick = document.createElement("div");
	inst.hPick.classList.add("picker");

	// (A3-2) HTML MONTH SELECT
	inst.hMonth = document.createElement("select");
	inst.hMonth.classList.add("picker-m");
	for (let m in months) {
	    temp = document.createElement("option");
	    temp.value = +m + 1;
	    temp.text = months[m];
	    inst.hMonth.appendChild(temp);
	}
	inst.hMonth.selectedIndex = thisMonth;
	inst.hMonth.onchange = () => { picker.draw(id); };
	inst.hPick.appendChild(inst.hMonth);

	// (A3-3) HTML YEAR SELECT
	inst.hYear = document.createElement("select");
	inst.hYear.classList.add("picker-y");
	for (let y = inst.startYear; y <= thisYear; y++) {
	    temp = document.createElement("option");
	    temp.value = y;
	    temp.text = y;
	    inst.hYear.appendChild(temp);
	}
	let yearRange = +thisYear - +(inst.startYear);
	inst.hYear.selectedIndex = yearRange;
	inst.hYear.onchange = () => { picker.draw(id); };
	inst.hPick.appendChild(inst.hYear);

	// (A3-4) HTML DAYS
	inst.hDays = document.createElement("div");
	inst.hDays.classList.add("picker-d");
	inst.hPick.appendChild(inst.hDays);
	picker.draw(id);

	// (A4) INLINE DATEPICKER - ATTACH INTO CONTAINER
	if (inst.container) { inst.container.appendChild(inst.hPick); }

	// (A5) POPUP DATEPICKER - ATTACH INTO HTML BODY
	else {
	    // (A5-1) FULL PAGE WRAPPER
	    inst.hWrap = document.createElement("div");
	    inst.hWrap.classList.add("picker-wrap");
	    inst.hWrap.appendChild(inst.hPick);

	    // (A5-2) CLICK TO TOGGLE DATEPICKER
	    inst.target.onfocus = () => {
		inst.hWrap.classList.add("show");
	    };
	    inst.hWrap.onclick = (evt) => { if (evt.target == inst.hWrap) {
		inst.hWrap.classList.remove("show");
	    }
	};

	    // (A5-3) ATTACH POPUP DATEPICKER
	    document.body.appendChild(inst.hWrap);
	}
    },

    // (B) DRAW DAYS IN MONTH
    draw : (id) => {
	// (B1) CRAZY VARS & CALCULATIONS
	// (B1-1) GET INSTANCE + SELECTED MONTH YEAR
	let inst = picker.instances[id],
            month = inst.hMonth.value,
            year = inst.hYear.value;

	// (B1-2) DATE RANGE CALCULATION (UTC+0)
	// Date.UTC(year, monthIndex, day, hour, minute, second, millisecond)
	//          takes 7 arguments, all but first optional
	//          Static method, so called as Date.UTC(),  
	//          not with a Date object
	// If any parameter underflows, it "borrows" from the higher positions. 
	// For example, new Date(2020, 5, 0) will return May 31st, 2020
	// (that's "June 0th").
	// Here's an example getting the number of days in November, 2022:
	// daysInMonth = new Date(Date.UTC(2022, 11, 0)).getUTCDate();
	// Result: daysInMonth = 30 for November 0th, 2022 (October 32nd).
	let daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate(),
	
	// startDay = new Date(Date.UTC(2022, 10, 1)).getUTCDay();
	// startDay = 2 for Tuesday, first day of November 2022
	// getUTCDay returns 0-6 for day of week.
        startDay = new Date(Date.UTC(year, month-1, 1)).getUTCDay(), // SUN IS 0
	
	// endDay = new Date(Date.UTC(2022, 10, daysInMonth)).getUTCDay();
	// endDay = 3, Wednesday, last day (30th) of November 2022
	endDay = new Date(Date.UTC(year, month-1, daysInMonth)).getUTCDay();
	
	headerStr = ("Year: ".concat(year)).concat(", Month: ");
	headerStr += month + "\n";

	alertStr = headerStr + "DaysInMonth: " + daysInMonth;
	alertStr += "\nStartDay: " + startDay;
	alertStr += "\nEndDay: " + endDay;
	console.log ( alertStr );
	
	startDay = startDay==0 ? 7 : startDay,
	endDay = endDay==0 ? 7 : endDay;

	// (B1-3) TODAY (FOR HIGHLIGHTING "TODAY'S DATE CELL")
	let today = new Date(), todayDate = null;
	if (today.getUTCMonth()+1 == month && today.getUTCFullYear() == year) {
	    todayDate = today.getUTCDate();
	}
	
	// (B1-4) DAY NAMES
	let daynames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

	// (B1-5) FOR GENERATING DATE SQUARES
	let table, row, cell, squares = [];

	// (B2) CALCULATE DATE SQUARES ARRAY
	// (B2-1) EMPTY SQUARES BEFORE FIRST DAY OF MONTH

	if (startDay!=7) { 
	    // Blanks in first week because it does not begin with Sunday
	    for (let i=0; i<startDay; i++) { squares.push("B"); }
	}
	
	console.log (squares) ;

	// (B2-3) DAYS OF MONTH

	for (let i=1; i<=daysInMonth; i++) { squares.push([i, false]); }
	
	console.log (squares) ;
	
	// (B2-4) EMPTY SQUARES AFTER LAST DAY OF MONTH
	if (endDay!=6) {
	    // Blanks needed because week does not end on Saturday
	    for (let i=endDay; i<(endDay==7?13:6); i++) { squares.push("B"); }
	}

	// (B3) DRAW HTML
	// (B3-1) HTML DAY NAMES HEADER
	table = document.createElement("table");
	row = table.insertRow();
	row.classList.add("picker-d-h");
	for (let d of daynames) {
	    cell = row.insertCell();
	    cell.innerHTML = d;
	}

	// (B3-2) HTML DATE CELLS
	row = table.insertRow();
	for (let i=0; i<squares.length; i++) {
	    if (i!=squares.length && i%7==0) { row = table.insertRow(); }
	    cell = row.insertCell();
	    if (squares[i] == "B") { cell.classList.add("picker-d-b"); }
	    else {
		// CELL DATE
		cell.innerHTML = squares[i][0];

		// NOT ALLOWED TO CHOOSE THIS DAY
		if (squares[i][1]) { cell.classList.add("picker-d-dd"); }

		// ALLOWED TO CHOOSE THIS DAY
		else {
		    if (squares[i][0] == todayDate) {
			cell.classList.add("picker-d-td");
		    }
		    cell.classList.add("picker-d-d");
		    cell.onclick = () => { picker.pick(id, squares[i][0]); }
		}
	    }
	}

	// (B4) ATTACH DAYS TO DATEPICKER
	inst.hDays.innerHTML = "";
	inst.hDays.appendChild(table);
    },

   
    // (C) CHOOSE A DATE
    pick : (id, day) => {
	// (C1) GET MONTH YEAR
	let inst = picker.instances[id],
            month = inst.hMonth.value,
            year = inst.hYear.value;

	// (C2) FORMAT & SET SELECTED DAY (YYYY-MM-DD)
	if (+month<10) { month = "0" + month; }
	if (+day<10) { day = "0" + day; }
	inst.target.value = `${year}-${month}-${day}`;

	// (C3) POPUP ONLY - CLOSE
	if (inst.container === undefined) {
	    inst.hWrap.classList.remove("show");
	}

	// (C4) CALL ON PICK IF DEFINED
	if (inst.onpick) { inst.onpick(inst.target.value); }
    }
};


function showLoc() {
  const logLines = ["Property (Typeof): Value", 
		    `location (${typeof location}): ${location}`];
  for (const prop in location) {
    logLines.push(`${prop} (${typeof location[prop]}): ${location[prop] || "n/a"}`);
  }
  alert(logLines.join("\n"));
}

function get_days_images (str) {
    /* given a string with a date (yyyy-mm-dd), refresh the web page with
     * images from that date */
     // picked_date = new Date();
     //let main_url = 'https://nm-meteors.net/NMMA_new.php?';
     let urlLoc  = location.origin,
	 urlPath = location.pathname;
     // alert(urlLoc.concat(urlPath));
     // showLoc();
     
     // picked_date.setFullYear(str.substring(0, 5));
     // picked_date.setMonth(str.substring(6, 8));
     // picked_date.setDate(str.substring(9));
     newUrl = urlLoc.concat(urlPath, '?date=', str);
     // alert(newUrl);
     window.location.assign(newUrl);
}
