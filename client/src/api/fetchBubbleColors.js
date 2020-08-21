import { axiosWithAuth } from '../utils/axiosWithAuth'

export const fetchBubbleColors = () => {
    return axiosWithAuth().get('/api/colors').then(res => res)
  }