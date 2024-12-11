import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AbstractFormComponent} from '../../tools/abstract-form-component';
import {HttpClient} from '@angular/common/http';
import {ArticleService} from '../../services/article.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.css'
})
export class ArticleEditorComponent extends AbstractFormComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(null),
    lien: new FormControl("Link", {validators: [Validators.required], nonNullable: true}),
    titre: new FormControl("Try", {validators: [Validators.required], nonNullable: true}),
    alt: new FormControl("Halte", {validators: [Validators.required], nonNullable: true}),
    description: new FormControl("Descript", {validators: [Validators.required]})
  });

  pics: string[] = new Array(11) // crée un tableau de la taille souhaitée
    .fill(0) // affecte la même valeur à tous les éléments du tableau
    .map((v,i) => `pic${(i+1).toString().padStart(2,'0')}.jpg`) // transforme chaque valeur en utilisant ici leur index

  constructor(private service: ArticleService, private router: Router, route: ActivatedRoute) {
    super();
    /*route.paramMap.subscribe(param => {
      const id: number = +param.get('id')!
      if(id) service.byId(id).subscribe({
        // résultat obtenu à chaque changement quand tout se passe bien
        next: result => this.form.patchValue(result),
        // annonce qu'il n'y aura plus de changement emit
        complete: () => console.log("Fin des appels"),
        // en cas d'erreur lors d'une tentative de changement
        error: e => router.navigate(['/editor/0'])
      })
    })*/
    route.data.subscribe(({article}) => {
      if (article) this.form.patchValue(article)
      else this.form.reset({
        id: 0,
        description: "Description Reset"
      })
    })
  }
  /*private service = inject(ArticleService)
  private router = inject(Router)*/




  onSubmit$(): void {
    /*if(this.form.value.id)
      this.service.update(this.form.value).subscribe(() => this.router.navigate(['/home']))
    else
      this.service.save(this.form.value).subscribe(() => this.router.navigate(['/home']))*/

    /*const prepa = this.form.value.id
      ? this.service.update(this.form.value)
      : this.service.save(this.form.value)
    prepa.subscribe(() => this.router.navigate(['/home']))*/

    /*(this.form.value.id
      ? this.service.update(this.form.value)
      : this.service.save(this.form.value)).subscribe(() => this.router.navigate(['/home']))*/

    this.service[this.form.value.id ? 'update' : 'save'](this.form.value)
      .subscribe(() => this.router.navigate(['/home']))
  }
}
