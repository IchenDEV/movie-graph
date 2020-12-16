import { getData } from "@/utils/fetch";
async function getPersonCommunityByID(id) {
  let info = await getData("http://admin.idevlab.cn:8008/get_person_id/" + id);
  if (info === 404) return null;
  info = info[0];
  return getPersonCommunityByName(info.name);
}
async function getPersonCommunityByName(name) {
  let data = await getData("../../res.json");
  console.log(name);
  for (let i1 of data.children) {
    for (let i2 of i1.children) {
      for (let i3 of i2.children) {
        for (let i4 of i3.children) {
          if (i4.name === name) {
            return i3;
          }
        }
      }
    }
  }
  return null;
}

async function getCommunityByID(deep, id) {
  let data = await getData("../../res.json");
  for (let i1 of data.children) {
    if (deep==1&&i1.id == id) {
      return i1;
    }
    for (let i2 of i1.children) {
      if (deep==2&&i2.id == id) {
        return i2;
      }
      for (let i3 of i2.children) {
        if (deep==3&&i3.id == id) {
          return i3;
        }
      }
    }
  }
  console.log(null)
  return null;
}

export { getPersonCommunityByName, getPersonCommunityByID,getCommunityByID };
