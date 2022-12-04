import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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
      this.livro.id = this.route.snapshot.paramMap.get('id')!;
      this.findbyId();
    }
    findbyId(): void{
      this.service.findById(this.livro.id!).subscribe((resposta) => {
        this.livro.id = resposta.id;
        this.livro.titulo = resposta.titulo;
        this.livro.nome_autor = resposta.nome_autor;
        this.livro.texto = resposta.texto;
      });
    }
    update():void {
      this.service.update(this.livro).subscribe({
        next: (n)=>{
          this.router.navigate([`categorias/${this.id_cat}/livros`]);
          this.service.mensagem("Livro Atualizado com Sucesso!")
        },
        error: (e)=>{
          this.router.navigate([`categorias/${this.id_cat}/livros`]);
          this.service.mensagem("erro ao atualizar o livro" + e);
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
