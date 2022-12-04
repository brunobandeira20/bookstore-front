import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

titulo = new FormControl('',[Validators.minLength(3)])
nome_autor = new FormControl('',[Validators.minLength(3)])
texto = new FormControl('',[Validators.minLength(10)])

id_cat: String = '';

livro: Livro = {
  id: '',
  titulo: '',
  nome_autor: '',
  texto: ''
}

  constructor(private service:LivroService,private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }
  create():void {
    this.service.create(this.livro, this.id_cat).subscribe({
      next: (n) =>{
        this.router.navigate([`categorias/${this.id_cat}/livros/`]);
        this.service.mensagem('Livro Criado com Sucesso!');
      },
      error: (e) => {
        this.router.navigate([`categorias/${this.id_cat}/livros/`]);
        this.service.mensagem(`Erro ao criar Livro: ${e}`);
      }
    })
  }
  cancelar(){
  this.router.navigate([`categorias/${this.id_cat}/livros`])
  }
  getMessageTitulo() {
    if(this.titulo.invalid){
      return 'O campo TITULO deve conter entre 3 e 100 caracteres';
    }
    return false;
  }
  getMessageNomeAutor(){
    if(this.nome_autor.invalid){
      return 'O campo NOME AUTOR deve conter entre 3 e 100 caracteres';
    }
    return false;
  }
  getMessageTexto(){
    if(this.texto.invalid){
      return 'O campo TEXTO deve conter entre 10 e 2000000 caracteres';
    }
    return false;
  }
}
