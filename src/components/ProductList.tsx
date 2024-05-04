import { useState, useEffect } from 'react';
import { Button, Card, Typography, Modal, Row, Col, Divider, Input } from 'antd';
import { PrinterOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../assets/logo.png'; // Import your logo file
import { ipcRenderer } from 'electron';
import { IpcChannels } from '../../electron/main/modules/utils';
import { getAuthToken } from '@/utils/localStorage';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ProductPage = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [barCode, setBarCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    retrieveProducts();
  }, []);

  useEffect(() => {
    let timer: any;
    if (errorMsg || successMsg) {
      timer = setTimeout(() => {
        setErrorMsg('');
        setSuccessMsg('');
      }, 3000); // Reset messages after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [errorMsg, successMsg]);


  const retrieveProducts = async () => {
    const res = await ipcRenderer.invoke(IpcChannels.products.getAll);
    if (res.success) {
      setProducts(res.data);
    }
  }

  const handlePrint = async (product: any) => {
    if (confirm("")) {
      const response = await ipcRenderer.invoke(IpcChannels.ticket.print, {product, session: getAuthToken()});
    }
  };

  const handleOpenPopup = async () => {
    // await ipcRenderer.invoke(IpcChannels.session.logout, {id: getAuthToken().id, bilanComptable: 100, bilanReel: 50, ecart: -50});
    // navigate('/');
    setIsPopupVisible(true);
    const res = await ipcRenderer.invoke(IpcChannels.session.preview, getAuthToken().id);
    console.log(res);
    
  };

  const handleClosePopup = () => {
    //setIsPopupVisible(false);
  };

  const handleCancelTicket = async () => {
    if (confirm("Etes vous sure de vouloir annuler le ticket ?")){
      const res = await ipcRenderer.invoke(IpcChannels.ticket.cancel, barCode);
      if (res.success) {
        setErrorMsg("");
        setSuccessMsg("Ticket annulé.");
      } else {
        setSuccessMsg("")
        setErrorMsg(res.message);
      }
      setBarCode("");
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleCancelTicket();
    }
  };

  return (
    <div className="flex flex-col h-screen relative" style={{ backgroundColor: '#f5f5f5' }}>
  <div className="bg-red-800 p-4">
    {/* Top Navigation Bar */}
    <div className="flex justify-between items-center">
      <div>
        {/* Logo in top-left corner */}
        <img src={logo} alt="Logo" className="h-16" />
      </div>
    </div>
  </div>
  <div className="flex flex-row flex-1">
    {/* Side Navbar */}
    <div className="bg-gray-800 p-4 flex flex-col justify-between text-white">
      {/* Sidebar content goes here */}
      <div>
        {/* Additional sidebar content can be added here */}
      </div>
      <Button type="primary" danger onClick={handleOpenPopup} icon={<LockOutlined />}>
        Fermer la session
      </Button>
    </div>


    <div className="flex-1 bg-gray-200 p-4 overflow-auto">
      {/* Product Cards */}
     
      <Title level={3} style={{ marginBottom: '16px' }}>Annulation de tickets</Title>
      <Row justify="center" align="middle" style={{ height: '100px' }}>
      <div style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Input
            placeholder="Code barre..."
            value={barCode}
            onChange={(e) => setBarCode(e.target.value)}
            style={{ width: 200, marginRight: '16px' }}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleCancelTicket} danger={true}>
            Annuler le ticket
          </Button>
        </div>
        <div className="mt-2 text-sm font-semibold">
          {errorMsg && <span className="text-red-500">{errorMsg}.</span>}
          {successMsg && <span className="text-green-500">{successMsg}</span>}
        </div>
      </div>
      </Row>
      <Divider />
      <Title level={3} style={{ marginBottom: '16px' }}>Liste des produits</Title>
      <Row justify="center" gutter={[16, 16]} className="mt-40 mb-40">
        {products.map((product, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card title={product.price + ' DA'} extra={<Button className="bg-red-800" type="primary" onClick={() => handlePrint(product)} icon={<PrinterOutlined />}>Imprimer</Button>} style={{ backgroundColor: 'white' }}>
              <div>
                <Title level={4}>Tickets : {product.nb_ticket}</Title>
                <Text style={{ fontSize: '3rem' }}>{product.name}</Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  </div>

  {/* Popup */}
  <Modal
    title="Popup Title"
    open={isPopupVisible}
    onCancel={handleClosePopup}
    footer={[
      <Button key="close" onClick={handleClosePopup}>Close</Button>
    ]}
  >
    <p>This is the content of the popup.</p>
  </Modal>
</div>
  );
};

export default ProductPage;