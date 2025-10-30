// src/firebase/firestore.js
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app  from "./config";
 // asegúrate de tener firebaseConfig.js configurado

const db = getFirestore(app);
const storage = getStorage(app);

/* ==============================
   🔹 FUNCIONES PARA COLLABORATORS
   ============================== */

/**
 * Obtener todos los comercios colaboradores
 * @returns {Promise<Array>} lista de colaboradores
 */
export const getAllComercios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "collaborators"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("❌ Error al obtener los comercios:", error);
    return [];
  }
};

/**
 * Obtener un comercio por ID
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export const getComercioById = async (id) => {
  try {
    const docRef = doc(db, "collaborators", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.warn("⚠️ Comercio no encontrado");
      return null;
    }
  } catch (error) {
    console.error("❌ Error al obtener el comercio:", error);
    return null;
  }
};

/**
 * Añadir un nuevo comercio colaborador
 * @param {Object} comercio
 * @returns {Promise<string>} ID del documento creado
 */
export const addComercio = async (comercio) => {
  try {
    const docRef = await addDoc(collection(db, "collaborators"), {
      name: comercio.name,
      description: comercio.description,
      logoUrl: comercio.logoUrl || "",
      address: comercio.address || "",
      category: comercio.category || "sin-categoría", // 🟣 Nuevo campo
      social: comercio.social || {},
      createdAt: serverTimestamp(),
    });
    console.log("✅ Comercio agregado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error al agregar comercio:", error);
    throw error;
  }
};

/**
 * Actualizar un comercio existente
 * @param {string} id
 * @param {Object} data
 */
export const updateComercio = async (id, data) => {
  try {
    const docRef = doc(db, "collaborators", id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
    console.log("✅ Comercio actualizado:", id);
  } catch (error) {
    console.error("❌ Error al actualizar comercio:", error);
  }
};

/**
 * Eliminar un comercio por ID
 * @param {string} id
 */
export const deleteComercio = async (id) => {
  try {
    await deleteDoc(doc(db, "collaborators", id));
    console.log("🗑️ Comercio eliminado:", id);
  } catch (error) {
    console.error("❌ Error al eliminar comercio:", error);
  }
};

/* ==============================
   🔹 FUNCIONES PARA SUBIR LOGOS A STORAGE
   ============================== */

/**
 * Subir imagen de logo a Firebase Storage
 * @param {File} file
 * @param {string} fileName
 * @returns {Promise<string>} URL pública del archivo
 */
export const uploadLogo = async (file, fileName) => {
  try {
    const storageRef = ref(storage, `collaborators/${fileName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log("📤 Logo subido:", url);
    return url;
  } catch (error) {
    console.error("❌ Error al subir logo:", error);
    throw error;
  }
};

export const addCollaborator = async (data) => {
  const docRef = await addDoc(collection(db, "comercios"), data);
  return docRef.id;
};

export const updateCollaborator = async (id, data) => {
  const docRef = doc(db, "comercios", id);
  await updateDoc(docRef, data);
};

export const deleteCollaborator = async (id) => {
  const docRef = doc(db, "comercios", id);
  await deleteDoc(docRef);
};

