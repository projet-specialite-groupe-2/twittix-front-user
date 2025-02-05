// import APIBackofficeInstance from '@/plugins/APIBackofficeInstance'
// import type {
// 	IGetProjectResponse,
// 	IProjectGlobal,
// 	IProjectDetail,
// } from '../types/interfaces/Project'
// import type APICall from '@betd/front-api-call'
// import { toast } from 'vue3-toastify'
// import { i18n } from '@/plugins/i18n'
// import type { ITranslateGroupResponse } from '@/core/types/interfaces/TranslateGroup'
// import type { IErrorType } from '../types/utils/errorType'

// export default class ProjectsService {
// 	private api: APICall
// 	private APIProject

// 	constructor() {
// 		this.api = APIBackofficeInstance.api
// 		this.APIProject = this.api.API.createEntity({ name: 'Projects' })
// 	}

// 	/**
// 	 * get all projects from the API
// 	 * @param void
// 	 * @returns {Promise<Array<IGetProjectResponse>>}
// 	 */
// 	async getProjects(): Promise<Array<IGetProjectResponse>> {
// 		let result = await this.APIProject.getAll<undefined, Array<IProjectGlobal>, IErrorType[]>()
// 		const { ok, data } = result
// 		let projects: Array<IGetProjectResponse> = []

// 		if (ok && data) {
// 			projects = data as Array<IGetProjectResponse>
// 		}
// 		return projects
// 	}
// 	/**
// 	 * get a project from the API
// 	 * @param id
// 	 * @param mock
// 	 * @returns {Promise<IProjectDetail | undefined>}
// 	 */
// 	async getProject(id: number): Promise<IProjectDetail | undefined> {
// 		let result = await this.APIProject.get<number, IProjectDetail, IErrorType>({
// 			complementURL: id.toString(),
// 		})
// 		const { ok, data } = result

// 		let project: IProjectDetail | undefined = undefined

// 		if (ok && data) {
// 			project = data as IProjectDetail
// 		}

// 		return project
// 	}
// 	/**
// 	 * call the API to delete a project with the id
// 	 * @param {number} idProject
// 	 * @returns {Promise<boolean>}
// 	 */
// 	async deleteProject(idProject: string): Promise<boolean> {
// 		let result = await this.APIProject.delete<undefined, boolean, IErrorType[]>({
// 			id: idProject,
// 		})

// 		const { ok } = result

// 		if (ok) {
// 			toast.success(i18n.global.t('common.success.delete'))
// 		} else {
// 			toast.error(i18n.global.t('errors.common.unknown-error'))
// 		}

// 		return ok ?? false
// 	}

// 	/**
// 	 * call the API To update a project with the id
// 	 * @param {IProjectGlobal} project
// 	 * @returns {Promise<boolean>}
// 	 */
// 	async updateProject(project: IProjectDetail): Promise<boolean> {
// 		const result = await this.APIProject.update<IProjectDetail, IProjectDetail, IErrorType[]>({
// 			toUpdate: { body: project },
// 		})
// 		const { ok } = result

// 		if (!ok) {
// 			toast.error(i18n.global.t('errors.common.unknown-error'))
// 		} else {
// 			toast.success(i18n.global.t('common.success.update'))
// 		}
// 		return ok ?? false
// 	}

// 	/**
// 	 * call the API To add a project
// 	 * @param {IProjectDetail} project
// 	 * @returns {Promise<boolean>}
// 	 */
// 	async AddProject(project: IProjectDetail): Promise<boolean> {
// 		let result = await this.APIProject.post({
// 			query: { body: project },
// 		})
// 		const { ok } = result

// 		if (!ok) {
// 			toast.error(i18n.global.t('errors.common.unknown-error'))
// 		} else {
// 			toast.success(i18n.global.t('common.success.add'))
// 		}

// 		return ok ?? false
// 	}

// 	/**
// 	 * get a project from the API
// 	 * @param id
// 	 * @param mock
// 	 * @param translateGroupId
// 	 * @returns {Promise<ITranslateGroupResponse | undefined>}
// 	 */
// 	async getTranslateGroupByProjectIdAndTranslateGroupId(
// 		projectId: number,
// 		translateGroupId: number,
// 	): Promise<ITranslateGroupResponse | undefined> {
// 		let result = await this.APIProject.get<undefined, ITranslateGroupResponse, IErrorType[]>({
// 			complementURL: `${projectId}/TranslateGroups/${translateGroupId}`,
// 		})

// 		let translateGroup: ITranslateGroupResponse | undefined = undefined
// 		const { ok, data } = result
// 		if (data && ok) {
// 			translateGroup = data as ITranslateGroupResponse
// 		}

// 		return translateGroup
// 	}

// 	/**
// 	 * get a project from the API
// 	 * @param id
// 	 * @param mock
// 	 * @param translateGroupId
// 	 * @returns {Promise<ITranslateGroupResponse | undefined>}
// 	 */
// 	async getTranslateGroupByProjectId(projectId: number): Promise<Array<ITranslateGroupResponse>> {
// 		let result = await this.APIProject.get<undefined, Array<ITranslateGroupResponse>, IErrorType[]>(
// 			{
// 				complementURL: `${projectId}/TranslateGroups`,
// 			},
// 		)

// 		const { ok, data } = result
// 		let translateGroups: Array<ITranslateGroupResponse> = []

// 		if (ok && data) {
// 			translateGroups = data as Array<ITranslateGroupResponse>
// 		}

// 		return translateGroups
// 	}

// 	/**
// 	 * add a project translate group
// 	 * @param id
// 	 * @param mock
// 	 * @param translateGroupId
// 	 * @returns {Promise<ITranslateGroupResponse | undefined>}
// 	 */
// 	async addProjectTranslateGroup(
// 		projectId: number,
// 		translateGroup: ITranslateGroupResponse,
// 	): Promise<boolean> {
// 		let result = await this.APIProject.post<
// 			ITranslateGroupResponse,
// 			ITranslateGroupResponse,
// 			IErrorType
// 		>({
// 			complementURL: `${projectId}/TranslateGroups`,
// 			query: { body: translateGroup },
// 		})

// 		const { ok } = result

// 		if (!ok) {
// 			toast.error(i18n.global.t('errors.common.unknown-error'))
// 		} else {
// 			toast.success(i18n.global.t('common.success.add'))
// 		}
// 		return ok ?? false
// 	}

// 	/**
// 	 * get a project from the API
// 	 * @param id
// 	 * @param mock
// 	 * @param translateGroupId
// 	 * @returns {Promise<ITranslateGroupResponse | undefined>}
// 	 */
// 	async updateProjectTranslateGroup(
// 		projectId: number,
// 		translateGroup: ITranslateGroupResponse,
// 	): Promise<boolean> {
// 		let result = await this.APIProject.update<
// 			ITranslateGroupResponse,
// 			ITranslateGroupResponse,
// 			IErrorType
// 		>({
// 			complementURL: `${projectId}/TranslateGroups`,
// 			toUpdate: { body: translateGroup },
// 		})

// 		const { ok } = result

// 		if (!ok) {
// 			toast.error(i18n.global.t('errors.common.unknown-error'))
// 		} else {
// 			toast.success(i18n.global.t('common.success.update'))
// 		}
// 		return ok ?? false
// 	}

// 	/**
// 	 * Delete a project translate groupe
// 	 * @param id
// 	 * @param mock
// 	 * @param translateGroupId
// 	 * @returns {Promise<ITranslateGroupResponse | undefined>}
// 	 */
// 	async DeleteProjectTranslateGroup(projectId: string, translateGroupId: string): Promise<boolean> {
// 		let result = await this.APIProject.delete<boolean, boolean, IErrorType>({
// 			complementURL: `${projectId}/TranslateGroups/${translateGroupId}`,
// 		})

// 		const { ok } = result

// 		if (!ok) {
// 			toast.error(i18n.global.t('errors.common.unknown-error'))
// 		} else {
// 			toast.success(i18n.global.t('common.success.delete'))
// 		}
// 		return ok ?? false
// 	}
// }
