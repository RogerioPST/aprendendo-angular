import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PocAsyncComponent } from './componentes/poc-async/poc-async.component';
import { PocTakeUntilComponent } from './componentes/poc-take-until/poc-take-until.component';
import { PocTakeComponent } from './componentes/poc-take/poc-take.component';
import { PocUnsubComponent } from './componentes/poc-unsub/poc-unsub.component';
import { PocComponent } from './componentes/poc/poc.component';
import { PocBaseComponent } from './componentes/poc-base/poc-base.component';
import { UnsubscribePocComponent } from './componentes/unsubscribe-poc/unsubscribe-poc.component';
import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';



@NgModule({
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ],
  declarations: [
    UnsubscribePocComponent,
    PocComponent,
    PocAsyncComponent,
    PocTakeUntilComponent,
    PocTakeComponent,
    PocUnsubComponent,
    PocBaseComponent
  ]
})
export class UnsubscribeRxjsModule {}