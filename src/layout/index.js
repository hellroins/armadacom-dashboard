import { Layout } from "react-admin"
import { CustomAppBar } from "./CustomAppBar"
const MyLayout = (props) => <Layout {...props} appBar={CustomAppBar} />

export default MyLayout;