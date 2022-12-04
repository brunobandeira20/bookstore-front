import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../categoria/categoria.service';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo','livros', 'acoes'];

  livros:Livro[]=[]

  id_cat: String = '';
  
  constructor(private service:LivroService,
     private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit(): void {
    this.id_cat =  this.route.snapshot.paramMap.get('id_cat')!;
    this.findAll()
  }

  findAll():void{
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta;
      if(resposta.length == 0){
        this.service.mensagem("Nenhum Livro encontrado!")
      }
    })

  }
  navegarParaCriarLivro():void {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }
}
