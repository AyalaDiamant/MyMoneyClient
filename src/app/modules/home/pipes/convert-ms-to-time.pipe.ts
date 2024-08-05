import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertMsToTime'
})
export class ConvertMsToTimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if(value==null) return "";
    return convertMsToTime(value);
  }

}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}
function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you want to roll hours over, e.g. 00 to 24
  // 👇️ uncomment the line below
  // uncommenting next line gets you `00:00:00` instead of `24:00:00`
  // or `12:15:31` instead of `36:15:31`, etc.
  // 👇️ (roll hours over)
  // hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}
