function degreesToHMS(degrees)
{
        let i = Math.trunc(degrees); // integer part
        let f = degrees % 1; // fractional part
        
        let hours = Math.floor(degrees / 15);
        console.log("hours = " + hours);
        let hDelta = degrees - (hours * 15);
        console.log("remainder after hours = " + hDelta);
        let minutes = Math.floor(hDelta * 60);
        let mDelta = f - (minutes / 60);
        console.log("minutes = " + minutes);
        console.log("mDelta = " + mDelta);
        let seconds = mDelta * 3600;
        console.log("seconds = " + seconds);
        
        return ([hours, minutes, seconds]);
}

function jdFromGregorianCalendar (year, month, day) {
	if (month < 3) {
          month += 12;
          year -= 1;
        }
        
        console.log("year = " + year);
        console.log("month = " + month);
        console.log("day = " + day);
        
        let a = Math.floor(year / 100);
        // console.log("a = " + a);
        
        let b = 2 - a + Math.floor(a / 4);
        // console.log("b = " + b);
        
        let t1 = Math.floor(365.25 * (year + 4716));
        let t2 = Math.floor(30.6001 * (month + 1));
        console.log("t1 = " + t1);
        console.log("t2 = " + t2);
        
        let julianDay = t1 + t2 + day + b - 1524.5;
        return (julianDay);
}

function calendarDateFromJD (julianDate) {
        console.log('Arg passed in: ' + julianDate);
        let z = julianDate + 0.5;
        let f = z % 1;
        console.log(f);
        z = Math.trunc(z);
        console.log(z);
        let a;
        
        if (z < 2299161) {a = z;}
        else {
                let alpha = Math.floor((z-1867216.25)/36524.25);
                a = z + 1 + alpha - Math.floor(alpha/4);
        }
        
        let b = a + 1524;
        let c = Math.floor((b - 122.1) / 365.25);
        let d = Math.floor(365.25 * c);
        let e = Math.floor((b - d) / 30.6001);
        
        let day = b - d - Math.floor(30.6001 * e) + f;
        let m;
        if (e < 14) {
                m = e - 1;
        }
        else {m = e - 13;}
        
        let year;
        if (m > 2) {year = c - 4716;}
        else {year = c - 4715;}
        
        return [day, m, year];
}

function gregorianEasterDate (year) {
        const a = year % 19;
        const b = Math.trunc(year / 100);
        const c = year % 100;
        const d = Math.trunc(b / 4);
        const e = b  % 4;
        const t1 = (b + 8) / 25;
        const f = Math.trunc(t1);
        const t2 = b - f + 1;
        const g = Math.trunc(t2 / 3);
        const t3 = 19*a + b - d - g + 15;
        const h = t3 % 30;
        const i = Math.trunc(c / 4);
        const k = c % 4;
        const t4 = 32 + 2*e + 2*i - h - k;
        const l = t4 % 7;
        const t5 = a + 11*h + 22*l;
        const m = Math.trunc(t5 / 451);
        const t6 = h + l - 7*m + 114;
        const n = Math.trunc(t6 / 31);
        const p = t6 % 31;
        console.log('n = ' + n);
        console.log('p = ' + p);
        
        return ([n, p+1]);
}
