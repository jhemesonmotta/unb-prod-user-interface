import {Injectable} from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {MatSpinner} from '@angular/material/progress-spinner';
import {Subject} from 'rxjs';
import {map, scan} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {

  private spinnerTopRef = this.cdkSpinnerCreate();

  spin$: Subject<boolean> = new Subject();

  private lockKey;

  constructor(
    private overlay: Overlay,
  ) {

    this.spin$
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if (res === 1) {
            this.showSpinner()
          } else if (res == 0 && this.spinnerTopRef.hasAttached()) {
            this.stopSpinner();
          }
        }
      )
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    })
  }

  public showSpinner(lockKey?: string) {
    if(lockKey){
      this.lockKey = lockKey;
    }
    if(!this.spinnerTopRef.hasAttached()){
      this.spinnerTopRef.attach(new ComponentPortal(MatSpinner))
    }
  }

  public stopSpinner(lockKey?: string) {
    if(lockKey && lockKey == this.lockKey){
      this.spinnerTopRef.detach();
      this.lockKey = null;
    }else if(!this.lockKey){
      if((this.spinnerTopRef.hasAttached() && !lockKey) || lockKey == this.lockKey) {
        this.spinnerTopRef.detach();
      }
    }else{
      console.log('Stop spinner trancado chamado com chave incorreta, a chave é: '+ lockKey + ' deveria ser '+ this.lockKey);
    }

  }
}
