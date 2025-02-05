import { defineStore } from 'pinia'
import { PetService, type Pet } from '@/core/api'
import request from './storeConfig'

export const usePetStore = defineStore('pet', {
  state: (): {
    pet: Pet | null
    loading: boolean
  } => ({
    pet: null,
    loading: false,
  }),
  actions: {
    async fetchPetById(id: number) {
      const projectService = new PetService(request)
      this.loading = true

      const pet = await projectService.getPetById({ petId: id })

      this.loading = false

      this.pet = pet
    },
  },
})
