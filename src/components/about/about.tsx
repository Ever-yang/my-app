import { useParams } from 'react-router-dom'
export const About = () => {
    // 直接获取路径中的 id
    const { id } = useParams()
    return <div>about:{id}</div>
}