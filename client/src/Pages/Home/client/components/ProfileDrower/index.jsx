import React from 'react'

import { DatePicker, Drawer, Input, Select, Button } from 'antd';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import styles from "./index.module.scss";
import dayjs from './../../../../../../node_modules/dayjs/esm/index';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDispatch } from 'react-redux';
import { changeProfileData, changeProfileDrawer, onExitUser, saveProfileData } from '../../../../../store/Auth/action';

dayjs.extend(customParseFormat);

const ProfileDrower = () => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.auth.user)
    const isOpenProfile = useSelector(store => store.auth.profile.isOpen)
    
    const onClose = () => dispatch(changeProfileDrawer()) 
    const onSave = () => dispatch(saveProfileData(user)) 
    const onExit = () => dispatch(onExitUser()) 
    const onChange = (props) => dispatch(changeProfileData(props));

    const isChanged = React.useMemo(() => {
      const storageData=localStorage.getItem("user")
      const parsedUser=JSON.parse(storageData)
      if(parsedUser.name !== user.name){
        return false
      } 
      if(parsedUser.surname !== user.surname){
        return false
      } 
      if(parsedUser.sex !== user.sex){
        return false
      } 
      if(parsedUser.city !== user.city){
        return false
      } 
      return true
    }, [user])

    if(!isOpenProfile) return null
    return (
        <Drawer
          title="Профиль"
          closable={false}
          open={isOpenProfile}
          placement={'bottom'}
          height={"100%"}
          style={{position:"relative"}}
        >
            <div className={styles.root}>
                <div className={styles.selectSexAndBirth}>
                    <Input onChange={e => onChange({value:e.target.value, name:e.target.name })} name='name' size='large' value={user?.name} placeholder="Имя" />
                    <Input onChange={e=>onChange({value:e.target.value, name:e.target.name })} name='surname' size='large' value={user?.surname} placeholder="Фамилие" />
                </div>
                <div className={styles.selectSexAndBirth}>
                    <Select
                      showSearch
                      placeholder="Город"
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      onSelect={value=> onChange({value, name:"city"})}
                      size='large'
                      value={user?.city}
                      options={[
                        { value: 'Бишкек', label: 'Бишкек' },
                        { value: 'Ош', label: 'Ош' },
                        { value: 'Каракол', label: 'Каракол' }
                      ]}
                    />
                    <Select
                        defaultValue={null}
                        value={user?.sex}
                        size='large'
                        onSelect={value=> onChange({value, name:"sex"})}
                        options={[
                          { value: 'male', label: 'Мужской' },
                          { value: 'famale', label: 'Женский' },
                        ]}
                        placeholder="Пол"
                    />
                     <DatePicker 
                        format={'YYYY-MM-DD'}
                        placeholder='Дата рождения'
                        // value={dayjs(new Date(user.birthday), 'YYYY-MM-DD')}
                        value={user?.birthday ? dayjs(user.birthday) : null}
                        // value={!!user.birthday?new Date(user.birthday):undefined}
                        disabledDate={(e) => e && e > dayjs().endOf('day')}
                        size='large'
                     />
                </div>
                <div>
                  {/* <QRCode value={ `${window.location.href}user/${user?.userId}` } />  */}
                </div>
                
            </div>
            
            <div className={styles.actions}>
                <Button onClick={onExit} size='large' danger type="primary">Выйти</Button>
              <div className={styles.closeButtons}>
                <Button disabled={isChanged} onClick={onSave} size='large' type="primary">Изменить</Button>
                <Button onClick={onClose} size='large'>Закрыть</Button>
              </div>
            </div>
        </Drawer>
    )
}

export default ProfileDrower