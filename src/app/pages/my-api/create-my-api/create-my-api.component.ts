import { Component, OnInit } from '@angular/core';
import { DeathNoteService, Character, ApiResponse } from '../../../services/death-note.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-my-api',
  templateUrl: './create-my-api.component.html',
  styleUrls: ['./create-my-api.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CreateMyApiComponent implements OnInit {
  character: Character = {
    _id: '',
    name: '',
    alias: '',
    description: '',
    deathNoteOwner: false,
    shinigami: false,
    intelligence: 1,
    image: '',
    abilities: [],
    status: 'Desconocido',
    relationships: []
  };
  
  newAbility: string = '';
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  searchTerm: string = '';
  message: string = '';
  success: boolean = false;
  isEditing: boolean = false;

  constructor(private deathNoteService: DeathNoteService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  // Method to filter characters by name
  searchCharacters() {
    if (!this.searchTerm) {
      this.filteredCharacters = this.characters;
    } else {
      this.filteredCharacters = this.characters.filter(char => 
        char.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  addAbility() {
    if (this.newAbility.trim()) {
      if (!this.character.abilities.includes(this.newAbility.trim())) {
        this.character.abilities.push(this.newAbility.trim());
        this.newAbility = '';
      }
    }
  }

  removeAbility(ability: string) {
    this.character.abilities = this.character.abilities.filter(a => a !== ability);
  }

  loadCharacters() {
    this.deathNoteService.getCharacters().subscribe(
      (response: ApiResponse) => {
        this.characters = Array.isArray(response.data) ? response.data : [response.data];
        this.filteredCharacters = [...this.characters];
      },
      error => {
        this.message = 'Error al cargar personajes: ' + error.message;
      }
    );
  }

  onSubmit() {
    if (this.isEditing) {
      this.deathNoteService.updateCharacter(this.character._id, this.character).subscribe(
        (response: ApiResponse) => {
          this.success = response.success;
          this.message = response.success ? 'Personaje actualizado exitosamente!' : 'Error al actualizar personaje.';
          if (response.success) {
            this.resetForm();
            this.loadCharacters();
          }
        },
        error => {
          this.success = false;
          this.message = 'Error al actualizar personaje: ' + error.message;
        }
      );
    } else {
      this.deathNoteService.createCharacter(this.character).subscribe(
        (response: ApiResponse) => {
          this.success = response.success;
          this.message = response.success ? 'Personaje creado exitosamente!' : 'Error al crear personaje.';
          if (response.success) {
            this.resetForm();
            this.loadCharacters();
          }
        },
        error => {
          this.success = false;
          this.message = 'Error al crear personaje: ' + error.message;
        }
      );
    }
  }

  editCharacter(char: Character) {
    this.character = { ...char };
    this.isEditing = true;
  }

  deleteCharacter(id: string) {
    this.deathNoteService.deleteCharacter(id).subscribe(
      (response: ApiResponse) => {
        this.success = response.success;
        this.message = response.success ? 'Personaje eliminado exitosamente!' : 'Error al eliminar personaje.';
        if (response.success) {
          this.loadCharacters();
        }
      },
      error => {
        this.success = false;
        this.message = 'Error al eliminar personaje: ' + error.message;
      }
    );
  }

  resetForm() {
    this.character = {
      _id: '',
      name: '',
      alias: '',
      description: '',
      deathNoteOwner: false,
      shinigami: false,
      intelligence: 1,
      image: '',
      abilities: [],
      status: 'Desconocido',
      relationships: []
    };
    this.message = '';
    this.isEditing = false;
    this.newAbility = '';
  }
}
