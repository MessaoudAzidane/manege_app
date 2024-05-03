import { Button, Card, Input } from 'antd';
import backgroundImage from './../assets/bg.jpg'
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { IpcChannels } from '../../electron/main/modules/utils';
import { setAuthToken } from '@/utils/localStorage';

const LoginPage = () => {
  const [pwd, setPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    closeSession();
  }, []);

  const closeSession = async () => {
    await ipcRenderer.invoke(IpcChannels.session.closeSession);
  }

  const handleLogin = async () => {
    const res = await ipcRenderer.invoke(IpcChannels.session.login, pwd);
    if (res.success === true) {
      console.log(res.data);
      
      setAuthToken(res.data);
      navigate('/products');
    } else {
      setErrorMsg("Mot de passe incorrect!");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="flex-1 flex justify-center items-center">
        <Card className="w-80 text-black">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Login</h2>
            <p className="text-sm">Entrez votre mot de passe</p>
          </div>
          <Input.Password placeholder="Mot de passe" size="large" value={pwd} onChange={(e: any) => setPwd(e.target.value)} onKeyDown={handleKeyDown} />
          {errorMsg && <div className="text-red-500 mt-2">{errorMsg}</div>} {/* Render error message if present */}
          <div className="mt-4">
            <Button type="primary" block onClick={handleLogin}>Login</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
