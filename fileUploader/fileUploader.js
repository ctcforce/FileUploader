import {LightningElement, api, track} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class FileUploader extends LightningElement {

    @api
    parentId;
    @track
    documents = [];

    handleFileUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.documents = this.documents.concat(uploadedFiles);

        this.dispatchEvent(
            new CustomEvent(
                'filesuploaded',
                {
                    detail:
                        {
                            uploadedFiles: uploadedFiles,
                            parentId: this.parentId
                        }
                }
            )
        );
    }

    handleDeleteFile(event) {
        const docId = event.target.dataset.docid;
        this.documents.splice(this.documents.findIndex(doc => doc.documentId === docId), 1);

        this.dispatchEvent(
            new CustomEvent('filedeleted', {detail: {docId: docId, parentId: this.parentId}})
        );
    }
}
