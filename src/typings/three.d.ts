import { Subject } from 'rxjs';
import * as three from 'three';

declare module 'three' {
  interface Object3D {
    _selected: boolean;
    /**
     * Selection attribute (from raycaster)
     */
    selected: boolean;
    
    /**
     * If selectable
     */
    selectable: boolean;

    _selecting: Subject<boolean>;
    /**
     * Event on selection change
     */
    selecting: Subject<boolean>

    
    /**
     * Click attribute (from raycaster)
     */
    clicked: number;

    /**
     * If clickable
     */
    clickable: boolean;

    _clicking: Subject<number>;
    /**
     * Event on click
     */
    clicking: Subject<number>;

    /**
     * If events are disabled (affects all children as well)
     */
    disabled: boolean;
  }
}