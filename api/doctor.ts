import { http } from '@/utils/http'
export const getDoctorInfo = (query : any) => {
	return http({
		method: 'GET',
		url: "/doctor/page",
		data: query
	})
}