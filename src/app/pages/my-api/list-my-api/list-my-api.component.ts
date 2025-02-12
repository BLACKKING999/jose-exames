import { Component, OnInit } from '@angular/core';
import { DeathNoteService, Character } from '../../../services/death-note.service';
import { CardListComponent } from '../../../card-list/card-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-my-api',
  templateUrl: './list-my-api.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, CardListComponent]
})
export class ListMyApiComponent implements OnInit {
  characters: Character[] = [];
  isLoading = false;
  noResults = false;
  searchTerm = '';
  selectedCharacter: Character | null = null;

  constructor(private deathNoteService: DeathNoteService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.deathNoteService.getCharacters().subscribe({
      next: (response) => {
        console.log('Characters loaded successfully:', response.data); // Mensaje de depuración
        this.characters = Array.isArray(response.data) ? response.data : [response.data]; // Asegúrate de que sea un array
        this.noResults = this.characters.length === 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading characters:', err); // Mensaje de depuración
        this.isLoading = false;
        this.noResults = true;
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.loadCharacters();  // Cargar todos los personajes si el término de búsqueda está vacío
      return;
    }

    this.isLoading = true;
    this.deathNoteService.searchCharacters(this.searchTerm).subscribe({
      next: (response) => {
        console.log('Search results:', response.data); // Mensaje de depuración
        this.characters = Array.isArray(response.data) ? response.data : [response.data]; // Asegúrate de que sea un array
        this.noResults = this.characters.length === 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching characters:', err); // Mensaje de depuración
        this.isLoading = false;
        this.noResults = true;
      }
    });
  }

  onCharacterSelect(character: Character): void {
    this.selectedCharacter = character;
    console.log('Selected character:', character); // Mensaje de depuración
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadCharacters();
  }
}
