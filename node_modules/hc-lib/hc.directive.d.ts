import { ElementRef, AfterViewInit } from '@angular/core';
import { HcService } from './hc.service';
export declare class HcDirective implements AfterViewInit {
    private el;
    private hc;
    constructor(el: ElementRef, hc: HcService);
    ngAfterViewInit(): void;
}
