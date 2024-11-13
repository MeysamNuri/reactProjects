import { createContext } from "react";

const DashContext=createContext({
    currentPage:1,
    setCurrentPage:()=>{},
    perPage:5,
    handlePage:()=>{},
    CourseTables:()=>{},
    openNewDialog:()=>{},
    closeNewDialog:()=>{},
    CourseData:[],
    courses:[]
})
export default DashContext