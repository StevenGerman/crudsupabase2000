import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Persona } from '../data-model/persona.model';

//Datos de supabase
const apiKeySupa: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZG9rdnBsbHd3eHhmeWVtc2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MDA1MzQsImV4cCI6MjA0MjE3NjUzNH0.SP-pBRm20Z8733ucd0wc2X3-GkjH38G69qutVkYd2qw";
const authorizationSupa: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1ZG9rdnBsbHd3eHhmeWVtc2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2MDA1MzQsImV4cCI6MjA0MjE3NjUzNH0.SP-pBRm20Z8733ucd0wc2X3-GkjH38G69qutVkYd2qw";
const urlAPI = "https://wudokvpllwwxxfyemsdu.supabase.co/rest/v1/Personas";

const headers = new HttpHeaders({
  apikey: apiKeySupa,
  authorization: authorizationSupa
})

@Injectable({
  providedIn: 'root'
})



export class PersonasService {

  constructor(private httpCli : HttpClient) { }


  getAll(){
    return this.httpCli.get<Persona[]>(`${urlAPI}?select=*`,{headers});
  }

  modificar(id:number,persona: Persona) {
    return this.httpCli.patch(`${urlAPI}?id=eq.${id}`,
      {
    "perNombreApellido": persona.perNombreApellido,
    "perEmail": persona.perEmail,
    "perFechaNacimiento": persona.perFechaNacimiento,
    "perDni": persona.perDni
    },{headers});
  }



  guardar(persona: Persona) {
    return this.httpCli.post(urlAPI, persona, {headers});
  }


  eliminar(id: number) {
    return this.httpCli.delete(`${urlAPI}?id=eq.${id}`, {headers});
  }


}
