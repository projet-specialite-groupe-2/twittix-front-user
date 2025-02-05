// import { defineStore } from 'pinia'
// import type { IProjectDetail, IProjectGlobal } from '@/core/types/interfaces/Project'
// import ProjectsService from '@/core/services/projectsService'
// import type { ITranslateGroupResponse } from '@/core/types/interfaces/TranslateGroup'

// export const useProjectStore = defineStore('project', {
// 	state: (): {
// 		projects: Array<IProjectGlobal>
// 	} => ({
// 		projects: [],
// 	}),
// 	actions: {
// 		async fetchProjects() {
// 			const projectService = new ProjectsService()
// 			const projects = await projectService.getProjects()
// 			this.setProjects(projects)
// 		},
// 		setProjects(newProjects: Array<IProjectGlobal>) {
// 			this.projects = newProjects
// 		},
// 		async fetchProject(id: number) {
// 			const projectService = new ProjectsService()
// 			return projectService.getProject(id)
// 		},
// 		async updateProject(project: IProjectDetail) {
// 			const projectService = new ProjectsService()
// 			return await projectService.updateProject(project)
// 		},
// 		async addProject(project: IProjectDetail) {
// 			const projectService = new ProjectsService()
// 			return await projectService.AddProject(project)
// 		},
// 		async deleteProject(id: string) {
// 			const projectService = new ProjectsService()
// 			return await projectService.deleteProject(id)
// 		},
// 		async getTranslateGroupByItsIdAndProjectId(
// 			projectId: number,
// 			translateGroupId: number,
// 		): Promise<ITranslateGroupResponse | undefined> {
// 			const projectService = new ProjectsService()
// 			return await projectService.getTranslateGroupByProjectIdAndTranslateGroupId(
// 				projectId,
// 				translateGroupId,
// 			)
// 		},
// 		async updateProjectTranslateGroup(id: number, translateGroup: ITranslateGroupResponse) {
// 			const projectService = new ProjectsService()
// 			return await projectService.updateProjectTranslateGroup(id, translateGroup)
// 		},
// 		async addProjectTranslateGroup(id: number, translateGroup: ITranslateGroupResponse) {
// 			const projectService = new ProjectsService()
// 			return await projectService.addProjectTranslateGroup(id, translateGroup)
// 		},
// 		async getTranslateGroupByProjectId(id: number): Promise<Array<ITranslateGroupResponse>> {
// 			const projectService = new ProjectsService()
// 			return await projectService.getTranslateGroupByProjectId(id)
// 		},
// 		async deleteProjectTranslateGroup(projectId: string, translateGroupId: string) {
// 			const projectService = new ProjectsService()
// 			return await projectService.DeleteProjectTranslateGroup(projectId, translateGroupId)
// 		},
// 	},
// })
