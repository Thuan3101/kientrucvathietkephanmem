import { useRoutes } from "react-router-dom";
import routes from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConfigProvider } from "antd";
import dayjs from 'dayjs' // import plugin
import 'dayjs/locale/vi' // import locale
 // use plugin
dayjs.locale('vi') // use locale

function App() {
  const content = useRoutes(routes);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00a76f',
          fontFamily: 'Inter',
          borderRadius: 4
        },
        components: {
          Table: {
            /* here is your component tokens */
            headerBg: '#F4F6F8',
            headerColor: 'var(--text-soft)',
            rowSelectedBg: 'var(--bg-soft)',
            rowHoverBg: 'var(--bg-hover)',
            rowSelectedHoverBg: 'var(--bg-main)',
          },
          Switch: {
            // /* here is your component tokens */
            handleBg:  'var(--bg-main)'
          },
        },
      }}
    >
      {content}
      <ToastContainer />
    </ConfigProvider>
  );
}

export default App;
