import { db, auth, onAuthStateChanged } from './firebase-config.js';
import { 
    collection, getDocs, query, where, doc, getDoc, 
    addDoc, updateDoc, deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {
    const userId = auth.currentUser?.uid;
    const conditionsList = document.getElementById('conditionsList');
    const medicationsList = document.getElementById('medicationsList');
    const addRecordBtn = document.getElementById('addRecordBtn');
    const addRecordModal = document.getElementById('addRecordModal');
    
    // Load records when user is authenticated
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadMedicalRecords(user.uid);
        }
    });
    
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tabId = btn.getAttribute('data-tab') + 'Tab';
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Add record modal
    addRecordBtn.addEventListener('click', () => {
        addRecordModal.style.display = 'block';
    });
    
    document.querySelector('.modal-close').addEventListener('click', () => {
        addRecordModal.style.display = 'none';
    });
    
    document.getElementById('cancelRecordBtn').addEventListener('click', () => {
        addRecordModal.style.display = 'none';
    });
    
    // Save record
    document.getElementById('saveRecordBtn').addEventListener('click', saveRecord);
    
    async function loadMedicalRecords(userId) {
        const q = query(collection(db, 'medicalRecords'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        
        conditionsList.innerHTML = '';
        medicationsList.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const record = doc.data();
            const recordItem = createRecordItem(record, doc.id);
            
            if (record.type === 'condition') {
                conditionsList.appendChild(recordItem);
            } else if (record.type === 'medication') {
                medicationsList.appendChild(recordItem);
            }
            // Add other record types to their respective lists
        });
    }
    
    function createRecordItem(record, recordId) {
        const item = document.createElement('div');
        item.className = 'record-item';
        
        let icon;
        switch(record.type) {
            case 'condition':
                icon = '<i class="fas fa-disease"></i>';
                break;
            case 'medication':
                icon = '<i class="fas fa-pills"></i>';
                break;
            case 'allergy':
                icon = '<i class="fas fa-allergies"></i>';
                break;
            default:
                icon = '<i class="fas fa-file-medical"></i>';
        }
        
        item.innerHTML = `
            <div class="record-icon">${icon}</div>
            <div class="record-details">
                <h4>${record.name}</h4>
                ${record.date ? `<p class="record-date">${formatDate(record.date)}</p>` : ''}
                ${record.notes ? `<p class="record-notes">${record.notes}</p>` : ''}
            </div>
            <div class="record-actions">
                <button class="btn-icon edit-record" data-id="${recordId}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete-record" data-id="${recordId}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        item.querySelector('.edit-record').addEventListener('click', () => editRecord(recordId));
        item.querySelector('.delete-record').addEventListener('click', () => deleteRecord(recordId));
        
        return item;
    }
    
    async function saveRecord() {
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        
        const recordType = document.getElementById('recordType').value;
        const recordName = document.getElementById('recordName').value;
        const recordDate = document.getElementById('recordDate').value;
        const recordNotes = document.getElementById('recordNotes').value;
        
        try {
            await addDoc(collection(db, 'medicalRecords'), {
                userId,
                type: recordType,
                name: recordName,
                date: recordDate,
                notes: recordNotes,
                createdAt: new Date()
            });
            
            addRecordModal.style.display = 'none';
            loadMedicalRecords(userId);
        } catch (error) {
            console.error('Error saving record:', error);
        }
    }
    
    async function editRecord(recordId) {
        // Implementation for editing a record
    }
    
    async function deleteRecord(recordId) {
        if (confirm('Are you sure you want to delete this record?')) {
            await deleteDoc(doc(db, 'medicalRecords', recordId));
            loadMedicalRecords(auth.currentUser.uid);
        }
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});