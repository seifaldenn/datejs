/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 26-Nov-2007
 * @copyright: Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * @website: http://www.datejs.com/
 */
var TimeSpan=function(days,hours,minutes,seconds,milliseconds){var attributes='days hours minutes seconds milliseconds'.split(/\s+/);var gFn=function(attr){return function(){return this[attr];};};var sFn=function(attr){return function(val){this[attr]=val;return this;};};for(var i=0;i<attributes.length;i++){var a=attributes[i],A=a.slice(0,1).toUpperCase()+a.slice(1);TimeSpan.prototype[a]=0;TimeSpan.prototype['get'+A]=gFn(a);TimeSpan.prototype['set'+A]=sFn(a);}
if(arguments.length==4){this.days=days;this.hours=hours;this.minutes=minutes;this.seconds=seconds;}else if(arguments.length==5){this.days=days;this.hours=hours;this.minutes=minutes;this.seconds=seconds;this.milliseconds=milliseconds;}else if(arguments.length==1&&typeof days=="number"){var orient=(days<0)?-1:+1;this.milliseconds=Math.abs(days);this.days=Math.floor(this.milliseconds/86400000)*orient;this.milliseconds=this.milliseconds%86400000;this.hours=Math.floor(this.milliseconds/3600000)*orient;this.milliseconds=this.milliseconds%3600000;this.minutes=Math.floor(this.milliseconds/60000)*orient;this.milliseconds=this.milliseconds%60000;this.seconds=Math.floor(this.milliseconds/1000)*orient;this.milliseconds=this.milliseconds%1000;this.milliseconds=this.milliseconds*orient;}
this.compare=function(timeSpan){var t1=new Date(1970,1,1,this.hours,this.minutes,this.seconds),t2;if(timeSpan===null){t2=new Date(1970,1,1,0,0,0);}
else{t2=new Date(1970,1,1,timeSpan.hours(),timeSpan.minutes(),timeSpan.seconds());}
return(t1>t2)?1:(t1<t2)?-1:0;};this.add=function(timeSpan){return(timeSpan===null)?this:this.addSeconds(timeSpan.getTotalMilliseconds()/1000);};this.subtract=function(timeSpan){return(timeSpan===null)?this:this.addSeconds(-timeSpan.getTotalMilliseconds()/1000);};this.getTotalMilliseconds=function(){return(this.days*86400000)+(this.hours*3600000)+(this.minutes*60000)+(this.seconds*1000);};this.addDays=function(n){return new TimeSpan(this.getTotalMilliseconds()+(n*86400000));};this.addHours=function(n){return new TimeSpan(this.getTotalMilliseconds()+(n*3600000));};this.addMinutes=function(n){return new TimeSpan(this.getTotalMilliseconds()+(n*60000));};this.addSeconds=function(n){return new TimeSpan(this.getTotalMilliseconds()+(n*1000));};this.addMilliseconds=function(n){return new TimeSpan(this.getTotalMilliseconds()+n);};this.get12HourHour=function(){return((this.hours%12)?this.hours:12);};this.getDesignator=function(){return(this.hours<12)?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;};this.toString=function(format){this._toString=function(){if(this.days!==null&&this.days>0){return this.days+"."+this.hours+":"+this.p(this.minutes)+":"+this.p(this.seconds);}
else{return this.hours+":"+this.p(this.minutes)+":"+this.p(this.seconds);}};this.p=function(s){return(s.toString().length<2)?"0"+s:s;};var self=this;return format?format.replace(/d|dd|HH|H|hh|h|mm|m|ss|s|tt|t/g,function(format){switch(format){case"d":return self.days();case"dd":return this.p(self.days());case"H":return self.hours();case"HH":return this.p(self.hours());case"h":return self.get12HourHour();case"hh":return this.p(self.get12HourHour());case"m":return self.minutes();case"mm":return this.p(self.minutes());case"s":return self.seconds();case"ss":return this.p(self.seconds());case"t":return((this.hours<12)?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator).substring(0,1);case"tt":return(this.hours<12)?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;}}):this._toString();};return this;};var TimePeriod=function(years,months,days,hours,minutes,seconds,milliseconds){var attributes='years months days hours minutes seconds milliseconds'.split(/\s+/);var gFn=function(attr){return function(){return this[attr];};};var sFn=function(attr){return function(val){this[attr]=val;return this;};};for(var i=0;i<attributes.length;i++){var a=attributes[i],A=a.slice(0,1).toUpperCase()+a.slice(1);TimeSpan.prototype[a]=0;TimeSpan.prototype['get'+A]=gFn(a);TimeSpan.prototype['set'+A]=sFn(a);}
if(arguments.length==7){this.years=years;this.months=months;this.days=days;this.hours=hours;this.minutes=minutes;this.seconds=seconds;this.milliseconds=milliseconds;}else if(arguments.length==2&&arguments[0]instanceof Date&&arguments[1]instanceof Date){var date1=years.clone();var date2=months.clone();var temp=date1.clone();var orient=(date1>date2)?-1:+1;this.years=date2.getFullYear()-date1.getFullYear();temp.addYears(this.years);if(orient==+1){if(temp>date2){if(this.years!==0){this.years--;}}}else{if(temp<date2){if(this.years!==0){this.years++;}}}
date1.addYears(this.years);if(orient==+1){while(date1<date2&&date1.clone().addDays(date1.getDaysInMonth())<date2){date1.addMonths(1);this.months++;}}
else{while(date1>date2&&date1.clone().addDays(-date1.getDaysInMonth())>date2){date1.addMonths(-1);this.months--;}}
var diff=date2-date1;if(diff!==0){var ts=new TimeSpan(diff);this.days=ts.getDays();this.hours=ts.getHours();this.minutes=ts.getMinutes();this.seconds=ts.getSeconds();this.milliseconds=ts.getMilliseconds();}}
return this;};
