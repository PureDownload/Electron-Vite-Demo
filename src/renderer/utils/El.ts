//* element-plus 工具类封装
import { ElMessage, ElMessageBox } from "element-plus";

export function messageByText(text:string) {
    ElMessage(text)
}

export function successMessage(text:string) {
    ElMessage({
        type: "success",
        message: text
    })
}