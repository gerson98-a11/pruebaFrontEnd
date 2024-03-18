import React from 'react';
import { Descriptions, Avatar } from 'antd';
import imagenProfile from '../Images/imagenProfile.jpeg';

const items = [
  {
    key: '1',
    label: 'UserName',
    children: 'Gerson Alejandro Nerio Melgar',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '7477-8035',
  },
  {
    key: '3',
    label: 'Live',
    children: 'San salvador',
  },
  {
    key: '4',
    label: 'Email',
    span: 2,
    children: 'gnerio555@gmail.com/gerson.nerio@athena.sv',
  },
  {
    key: '5',
    label: 'Remark',
    children: 'La prueba estuvo interesante como observacion prodria dejar que ma faltaron los filtros ',
  },
];
const Profile = () => {

    return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginRight: '20px' }}>
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            src={imagenProfile}// Usa una imagen aleatoria en lugar del ícono predeterminado
          />
        </div>
        <div>
          <Descriptions title="User Info" layout="vertical" items={items} />
        </div>
      </div>
    );
};
export default Profile;