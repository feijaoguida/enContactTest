import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

import * as s from "./styles";
import api from "../../services/api";

function InBox() {
  const [menus, setMenu] = useState([]);
  const [contents, setContent] = useState([]);

  useEffect(() => {
    async function loadMenus() {
      const response = await api.get("menus");
      setMenu(response.data);
    }
    loadMenus();
  }, []);

  async function handleClickMenu(idMenu) {
    const response = await api.get(`items/${idMenu}`);
    setContent(response.data.subMenuItems);
    console.log(response.data.subMenuItems);
  }

  return (
    <s.Container>
      <s.SideLeft>
        <s.Menus>
          <s.MenuPerfil>AG</s.MenuPerfil>

          <s.MenuDrop>
            <select name="" id="">
              <option value="">Novo</option>
            </select>
          </s.MenuDrop>
        </s.Menus>
        <s.menuHideShow></s.menuHideShow>
        <s.Favorite>Favoritos</s.Favorite>
        <s.MenuList>
          {menus.map((menu) => (
            <s.ItensMenuList key={menu.id}>
              {menu.name}
              <s.MenuList>
                {menu.subMenus.map((submenu) => (
                  <s.ItensMenuList
                    onClick={() => handleClickMenu(submenu.id)}
                    key={submenu.id}
                  >
                    {submenu.name}
                  </s.ItensMenuList>
                ))}
              </s.MenuList>
            </s.ItensMenuList>
          ))}
        </s.MenuList>
      </s.SideLeft>

      <s.SideRigth>
        <s.Search>
          <div>
            <FaSearch size={18} color="#5f9ea0" />
          </div>

          <input type="text" id="txtBusca" placeholder="Buscar..." />
          <s.ButtonSearch id="btnBusca">Buscar</s.ButtonSearch>
        </s.Search>
        <s.DivActions>
          <s.Actions>
            <input type="checkbox" name="" id="" />
            <s.Button>Atribuir</s.Button>
            <s.ButtonPrimary>Arquivar</s.ButtonPrimary>
            <s.ButtonSave>Agendar</s.ButtonSave>
          </s.Actions>
          <s.Filter>
            {" "}
            <FaFilter size={18} color="#66615b" />{" "}
          </s.Filter>
        </s.DivActions>
        <s.ContentBody>
          <s.Cards>
            Tarefas.
            {contents.map((content) => (
              <s.CardContent key={content.id}>
                <s.CardLogo>{content.owner}</s.CardLogo>
                <s.CardDescription>
                  <p>{content.name}</p>
                  <p>{content.subject}</p>
                  <p>Caixa de entrada</p>
                </s.CardDescription>
                <s.CardActions>
                  {content.users.map((user) => (
                    <s.CardUsers key={user}>{user}</s.CardUsers>
                  ))}
                </s.CardActions>
              </s.CardContent>
            ))}
          </s.Cards>
        </s.ContentBody>
      </s.SideRigth>
    </s.Container>
  );
}

export default InBox;
