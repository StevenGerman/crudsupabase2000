import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';
import { Persona } from 'src/app/data-model/persona.model';
import { Observable,delay,timeout } from 'rxjs';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {

  listaPersonas: Persona[] | undefined;
  
  idEditar : number = 0;

  ngOnInit():void{
    this.getAllPersonas();
  }

  verFormulario: boolean = false;
  nuevo: boolean = true;

  formPersona = this.formB.group({
    perDni: [''],
    perNombreApellido: [''],
    perEmail: [''],
    perFechaNacimiento: ['']
  })

  constructor(
    private formB : FormBuilder,
    private servicioPersonas: PersonasService
  ){}

  btnAgregarPersona(): void {
    this.verFormulario = true;
    this.nuevo = true;
    this.formPersona.setValue({
      perDni: '',
      perNombreApellido: '',
      perEmail: '',
      perFechaNacimiento: ''
    })
  }

  onGuardarEstudiante(): void { //Boton Submit 
    let persona:any = this.formPersona.value;
    this.verFormulario = false;

    if (this.nuevo == true){
      this.servicioPersonas.guardar(persona).subscribe((error) => {console.log(error)});
    }else {
      this.servicioPersonas.modificar(this.idEditar,persona).subscribe(
        (error) => {console.error(error)});
    }
    
    setTimeout(() => this.getAllPersonas(), 1000);
    console.log(this.listaPersonas);

  }

  btnCancelar(): void {
    this.verFormulario = false;
  }

  btnEditar(persona:any): void {
    this.verFormulario = true;
    this.nuevo = false;
    this.idEditar = persona.id;

    this.formPersona.setValue({
      perDni: persona.perDni,
      perNombreApellido: persona.perNombreApellido,
      perEmail: persona.perEmail,
      perFechaNacimiento: persona.perFechaNacimiento
    })
  }


  getAllPersonas() {
    this.servicioPersonas.getAll().subscribe((res)=> this.listaPersonas = res)
  }

  btnEliminar(id: number): void {
    this.servicioPersonas.eliminar(id).subscribe((error) => console.log(error))
    setTimeout(() => this.getAllPersonas(), 1000);
    console.log(this.listaPersonas);
  }















}
