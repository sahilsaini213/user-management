import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription, Observable } from 'rxjs';

export abstract class BaseForm {
    form: FormGroup;
    isNew = false;
    isDestroy = false;
    id: string;
    submitted: boolean = false;
    loading: boolean = false;
    activatedRouteParamsSubscribe: Subscription;
    abstract formInit(formEditData?): FormGroup;
    abstract getFormEditDetail(id: string): Observable<any>;
    constructor(
        public activatedRoute: ActivatedRoute
    ) {}

    onInIt() {
        this.activatedRouteParamsSubscribe = this.activatedRoute.params.subscribe(params => {
            this.id = params.id;
            if (['create', 'new'].includes(this.id)) {
                this.isNew = true;
                this.id = null;
            }
            this.paramsUpdated();
        });
    }

    paramsUpdated() {
        this.form = this.formInit();
        if (!this.isNew) {
            this.loading = true;
            this.getFormEditDetail(this.id)
                .pipe(finalize(() => this.submitted = false))
                .subscribe((res: any) => {
                    this.form = this.formInit(res);
                    this.loading = false;
                });
        }
    }

    destroy() {
        this.activatedRouteParamsSubscribe?.unsubscribe();
        this.isDestroy = true;
    }

    get controls() { return this.form?.controls; }

}