// import axios from 'axios';
//
// const storeStars = (starList) => {
//   chrome.storage.local.get({ stars: {} }, (res) => {
//     const { stars } = res;
//     const NewStars = starList.reduce((ress, item) => {
//       const _res = ress;
//       _res[item.id] = item;
//       return _res;
//     }, stars);
//
//     chrome.storage.local.set({ stars: NewStars }, () => {});
//   });
// };
//
// const fetchStarList = async (username, page) => {
//   const githubAPI = `https://api.github.com/users/${username}/starred`;
//   try {
//     const response = await axios.get(githubAPI, { params: { page } });
//     // save items
//     storeStars(response.data);
//     if (response.data.length === 30) {
//       // it has next page
//       await fetchStarList(username, page + 1);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
//
// const fetchProcess = async () => {
//   chrome.storage.local.get({ user: '' }, async (result) => {
//     const { user } = result;
//     if (user === '') {
//       return false;
//     }
//     await fetchStarList(user, 1);
//     return true;
//   });
// };
//
// const handleUsername = async () => {
//   fetchProcess();
//   setInterval(fetchProcess, 1000 * 60 * 30);
// };
//
// handleUsername();
