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
  query,
  where, 
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./config"; // configuración de Firebase

/* =========================================
   🔧 Inicialización
   ========================================= */
const db = getFirestore(app);
const storage = getStorage(app);

// 🔹 Nombres de las colecciones en Firestore
const EVENTS_COLLECTION = "eventos";
const ACTIVITIES_COLLECTION = "actividades";


/* =========================================
   🔹 FUNCIONES GENERALES DE SUBIDA DE IMÁGENES
   ========================================= */
export const uploadImage = async (file, folder, fileName = null) => {
  try {
    const safeName = fileName || `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${safeName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log(`📤 Imagen subida correctamente a ${folder}:`, url);
    return url;
  } catch (error) {
    console.error("❌ Error al subir imagen:", error);
    throw error;
  }
};

/* =========================================
   🔹 FUNCIONES PARA COMERCIOS / COLABORADORES
   ========================================= */
export const getAllComercios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "comercios"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error al obtener los comercios:", error);
    return [];
  }
};

export const getComercioById = async (id) => {
  try {
    const docRef = doc(db, "comercios", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error("❌ Error al obtener el comercio:", error);
    return null;
  }
};

export const addComercio = async (comercio) => {
  try {
    let logoUrl = comercio.logoUrl || "";
    if (comercio.logoFile) logoUrl = await uploadImage(comercio.logoFile, "comercios");

    const docRef = await addDoc(collection(db, "comercios"), {
      name: comercio.name,
      description: comercio.description,
      logoUrl,
      phone: comercio.phone || "",
      email: comercio.email || "",
      address: comercio.address || "",
      category: comercio.category || "sin-categoría",
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

export const updateComercio = async (id, data) => {
  try {
    let logoUrl = data.logoUrl;
    if (data.logoFile) logoUrl = await uploadImage(data.logoFile, "comercios");

    const docRef = doc(db, "comercios", id);
   // eslint-disable-next-line no-unused-vars
    const { logoFile, ...restData } = data;
    await updateDoc(docRef, { ...restData, logoUrl, updatedAt: serverTimestamp() });

    console.log("✅ Comercio actualizado:", id);
  } catch (error) {
    console.error("❌ Error al actualizar comercio:", error);
    throw error;
  }
};

export const deleteComercio = async (id) => {
  try {
    await deleteDoc(doc(db, "comercios", id));
    console.log("🗑️ Comercio eliminado:", id);
  } catch (error) {
    console.error("❌ Error al eliminar comercio:", error);
  }
};

/* =========================================
   🔹 FUNCIONES PARA PRODUCTOS / TIENDA
   ========================================= */
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
};

export const addProduct = async (data) => {
  try {
    let imageUrl = data.imageUrl || "";
    if (data.imageFile) imageUrl = await uploadImage(data.imageFile, "productos");

    const docRef = await addDoc(collection(db, "productos"), {
      ...data,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Producto agregado:", docRef.id);
    return { id: docRef.id, ...data, imageUrl };
  } catch (error) {
    console.error("❌ Error al agregar producto:", error);
    throw error;
  }
};

export const updateProduct = async (id, data) => {
  try {
    let imageUrl = data.imageUrl || "";
    if (data.imageFile) imageUrl = await uploadImage(data.imageFile, "productos");

    const docRef = doc(db, "productos", id);
    await updateDoc(docRef, { ...data, imageUrl, updatedAt: serverTimestamp() });

    console.log("✅ Producto actualizado:", id);
    return { id, ...data, imageUrl };
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "productos", id));
    console.log("🗑️ Producto eliminado:", id);
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
  }
};

/* =========================================
   🔹 FUNCIONES PARA EVENTOS Y ACTIVIDADES
   ========================================= */

// Obtener todos los eventos
export const getAllEvents = async () => {
  try {
    const snapshot = await getDocs(collection(db, EVENTS_COLLECTION));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return [];
  }
};

// Obtener un evento por ID
export const getEventById = async (id) => {
  try {
    const ref = doc(db, EVENTS_COLLECTION, id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error("Error al obtener el evento:", error);
    return null;
  }
};

// Añadir un nuevo evento
export const addEvent = async (eventData) => {
  try {
    const ref = await addDoc(collection(db, EVENTS_COLLECTION), eventData);
    return ref.id;
  } catch (error) {
    console.error("Error al añadir evento:", error);
    throw error;
  }
};

// Actualizar un evento
export const updateEvent = async (id, updatedData) => {
  try {
    const ref = doc(db, EVENTS_COLLECTION, id);
    await updateDoc(ref, updatedData);
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    throw error;
  }
};

// Eliminar un evento y sus actividades asociadas
export const deleteEvent = async (id) => {
  try {
    // Eliminar primero las actividades asociadas
    const q = query(
      collection(db, ACTIVITIES_COLLECTION),
      where("eventId", "==", id)
    );
    const snapshot = await getDocs(q);
    const deletions = snapshot.docs.map((d) => deleteDoc(d.ref));
    await Promise.all(deletions);

    // Luego eliminar el evento
    await deleteDoc(doc(db, EVENTS_COLLECTION, id));
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    throw error;
  }
};
// ======================================================
// 🎉 ACTIVIDADES
// ======================================================
// Obtener todas las actividades
export const getAllActivities = async () => {
  try {
    const snapshot = await getDocs(collection(db, ACTIVITIES_COLLECTION));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener actividades:", error);
    return [];
  }
};

// Obtener actividades por ID de evento
export const getActivitiesByEvent = async (eventId) => {
  try {
    const q = query(
      collection(db, ACTIVITIES_COLLECTION),
      where("eventId", "==", eventId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener actividades del evento:", error);
    return [];
  }
};

// Añadir una nueva actividad
export const addActivity = async (activityData) => {
  try {
    const ref = await addDoc(collection(db, ACTIVITIES_COLLECTION), activityData);
    return ref.id;
  } catch (error) {
    console.error("Error al añadir actividad:", error);
    throw error;
  }
};

// Actualizar una actividad
export const updateActivity = async (id, updatedData) => {
  try {
    const ref = doc(db, ACTIVITIES_COLLECTION, id);
    await updateDoc(ref, updatedData);
  } catch (error) {
    console.error("Error al actualizar actividad:", error);
    throw error;
  }
};

// Eliminar una actividad
export const deleteActivity = async (id) => {
  try {
    const ref = doc(db, ACTIVITIES_COLLECTION, id);
    await deleteDoc(ref);
  } catch (error) {
    console.error("Error al eliminar actividad:", error);
    throw error;
  }
};
