import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria:Categoria = {
    id: '',
    nome: '',
    descricao: ''
  
  }
  constructor(private service: CategoriaService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
   this.categoria.id = this.route.snapshot.paramMap.get('id')!;
   this.findById();
  }
  findById():void{
    this.service.findById(this.categoria.id!).subscribe((resposta) =>{
      this.categoria.nome = resposta.nome;
      this.categoria.descricao = resposta.descricao;
      console.log(this.categoria);
      console.log(resposta)
    })
  }
  update():void {
    this.service.update(this.categoria).subscribe({
      next : (n) =>  {
        this.router.navigate(["categorias"]);
        this.service.mensagem("Categoria Atualizada com Sucesso!");
      },
      error : (e) =>{
        this.service.mensagem("Verifique se todos os campos estão preenchidos");
      }
    })
  }
  cancelar():void {
    this.router.navigate(["categorias"]);
  }
}
