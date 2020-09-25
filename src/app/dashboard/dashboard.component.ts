import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../services/clima.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  ciudad = '';
  paisName = '';
  codigoPais = '';
  weather: [] = [];
  query = false;
  temperatura: number;
  humedad: number;
  sensacion: number;
  clima: string;
  resultadoCiudad: string;
  loading = false;
  paises = []; 
  lsPaises = [];

  constructor(private climaService: ClimaService) {}

  ngOnInit(): void {
  this.getPaises()
  }

  getWeather() {
    this.loading = true;
    this.query = false;
    this.climaService.getClima(this.ciudad, this.codigoPais).subscribe(
      (item) => {
        this.temperatura = item.main.temp - 273.15;
        this.sensacion = item.main.feels_like - 273.15;
        this.humedad = item.main.humidity;
        this.resultadoCiudad = item.name;
        this.clima = this.transfomarTextoClima(item.weather[0].description);
        this.query = true;
        this.loading = false;
        this.ciudad = '';
        this.paisName = '';
      },
      (err) => {
        this.loading = false;
        console.log(err);
        alert('No se ha encontrado esa ciudad');
        this.query = false;
        this.ciudad = '';
        this.paisName = '';
      }
    );
  }

  getNamePais(pais) {
    this.codigoPais = pais.Code;
    this.paisName = pais.Name;
    this.paises = [];
  }

  transfomarTextoClima(clima) {
    return clima.charAt(0).toUpperCase() + clima.substr(1).toLowerCase();
  }

  getPais() {
    this.lsPaises = this.climaService.getPaises();
    this.paises = this.lsPaises.filter((item) =>
      item.Name.includes(this.transfomarTextoClima(this.paisName))
    );
  }
  onKeyPress(): void {
    alert(this.ciudad)
    this.getPais();
  }

  getPaises(){
      this.lsPaises = this.climaService.getPaises();
  }
}
