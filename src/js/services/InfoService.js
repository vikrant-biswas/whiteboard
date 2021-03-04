import ConfigService from "./ConfigService";

/**
 * Class the handle the information about the whiteboard
 */
class InfoService {
    /**
     * @type {boolean}
     */
    #infoAreDisplayed = false;
    #sizeDisplayed = false;
    #rectangleShapesDisplayed = false;
    #linesDisplayed = false;
    #uploadOptionsDisplayed = false;
    #saveOptionsDisplayed = false;

    get infoAreDisplayed() {
        return this.#infoAreDisplayed;
    }

    get sizeDisplayed() {
        return this.#sizeDisplayed;
    }

    get rectangleShapesDisplayed() {
        return this.#rectangleShapesDisplayed;
    }

    get linesDisplayed() {
        return this.#linesDisplayed;
    }

    get uploadOptionsDisplayed() {
        return this.#uploadOptionsDisplayed;
    }

    get saveOptionsDisplayed() {
        return this.#saveOptionsDisplayed;
    }

    /**
     * Holds the number of user connected to the server
     *
     * @type {number}
     */
    #nbConnectedUsers = -1;
    get nbConnectedUsers() {
        return this.#nbConnectedUsers;
    }

    /**
     * @type {{w: number, h: number}}
     */
    #smallestScreenResolution = undefined;
    get smallestScreenResolution() {
        return this.#smallestScreenResolution;
    }

    /**
     * @type {number}
     */
    #nbMessagesSent = 0;
    get nbMessagesSent() {
        return this.#nbMessagesSent;
    }

    /**
     * @type {number}
     */
    #nbMessagesReceived = 0;
    get nbMessagesReceived() {
        return this.#nbMessagesReceived;
    }

    /**
     * Holds the interval Id
     * @type {number}
     */
    #refreshInfoIntervalId = undefined;
    get refreshInfoIntervalId() {
        return this.#refreshInfoIntervalId;
    }

    /**
     * @param {number} nbConnectedUsers
     * @param {{w: number, h: number}} smallestScreenResolution
     */
    updateInfoFromServer({ nbConnectedUsers, smallestScreenResolution = undefined }) {
        if (this.#nbConnectedUsers !== nbConnectedUsers) {
            // Refresh config service parameters on nb connected user change
            ConfigService.refreshUserCountDependant(nbConnectedUsers);
        }
        this.#nbConnectedUsers = nbConnectedUsers;
        if (smallestScreenResolution) {
            this.#smallestScreenResolution = smallestScreenResolution;
        }
    }

    incrementNbMessagesReceived() {
        this.#nbMessagesReceived++;
    }

    incrementNbMessagesSent() {
        this.#nbMessagesSent++;
    }

    refreshDisplayedInfo() {
        const {
            nbMessagesReceived,
            nbMessagesSent,
            nbConnectedUsers,
            smallestScreenResolution: ssr,
        } = this;
        $("#messageReceivedCount")[0].innerText = String(nbMessagesReceived);
        $("#messageSentCount")[0].innerText = String(nbMessagesSent);
        $("#connectedUsersCount")[0].innerText = String(nbConnectedUsers);
        $("#smallestScreenResolution")[0].innerText = ssr ? `(${ssr.w}, ${ssr.h})` : "Unknown";
    }

    /**
     * Show the info div
     */
    displayInfo() {
        $("#whiteboardInfoContainer").toggleClass("displayNone", false);
        $("#displayWhiteboardInfoBtn").toggleClass("active", true);
        this.#infoAreDisplayed = true;

        this.refreshDisplayedInfo();
        this.#refreshInfoIntervalId = setInterval(() => {
            // refresh only on a specific interval to reduce
            // refreshing cost
            this.refreshDisplayedInfo();
        }, ConfigService.refreshInfoInterval);
    }

    /**
     * Hide the info div
     */
    hideInfo() {
        $("#whiteboardInfoContainer").toggleClass("displayNone", true);
        $("#displayWhiteboardInfoBtn").toggleClass("active", false);
        this.#infoAreDisplayed = false;
        const { refreshInfoIntervalId } = this;
        if (refreshInfoIntervalId) {
            clearInterval(refreshInfoIntervalId);
            this.#refreshInfoIntervalId = undefined;
        }
    }

    /**
     * Switch between hiding and showing the info div
     */
    toggleDisplayInfo() {
        const { infoAreDisplayed } = this;
        if (infoAreDisplayed) {
            this.hideInfo();
        } else {
            this.displayInfo();
        }
    }

    toggleSize() {
        const { sizeDisplayed } = this;
        if (sizeDisplayed) {
            this.hideSize();
        } else {
            this.displaySize();
        }
    }

    toggleRectangleShapes() {
        const { rectangleShapesDisplayed } = this;
        if (rectangleShapesDisplayed) {
            this.hideRectangleShapes();
        } else {
            this.displayRectangleShapes();
        }
    }

    toggleLines() {
        const { linesDisplayed } = this;
        if (linesDisplayed) {
            this.hideLines();
        } else {
            this.displayLines();
        }
    }

    toggleUploadOptions() {
        const { uploadOptionsDisplayed } = this;
        if (uploadOptionsDisplayed) {
            this.hideUploadOptions();
        } else {
            this.displayUploadOptions();
        }
    }

    toggleSaveOptions() {
        const { saveOptionsDisplayed } = this;
        if (saveOptionsDisplayed) {
            this.hideSaveOptions();
        } else {
            this.displaySaveOptions();
        }
    }

    /**
     * Show the Size div
     */
    displaySize() {
        $("#sizeContainer").toggleClass("displayNone", false);
        $("#displaySizeBtn").toggleClass("active", true);
        this.#sizeDisplayed = true;
        $("#sizeContainer").show();
    }

    /**
     * Hide the Size div
     */
    hideSize() {
        $("#sizeContainer").toggleClass("displayNone", true);
        $("#displaySizeBtn").toggleClass("active", false);
        this.#sizeDisplayed = false;
        $("#sizeContainer").hide();
    }

    /**
     * Show the Rectangle Shapes div
     */
    displayRectangleShapes() {
        $("#rectShapeContainer").toggleClass("displayNone", false);
        $("#displayRectangleShapesBtn").toggleClass("active", true);
        this.#rectangleShapesDisplayed = true;
        $("#rectShapeContainer").show();
    }

    /**
     * Hide the Rectangle Shapes div
     */
    hideRectangleShapes() {
        $("#rectShapeContainer").toggleClass("displayNone", true);
        $("#displayRectangleShapesBtn").toggleClass("active", false);
        this.#rectangleShapesDisplayed = false;
        $("#rectShapeContainer").hide();
    }

    /**
     * Show the lines div
     */
    displayLines() {
        $("#linesContainer").toggleClass("displayNone", false);
        $("#displayLinesBtn").toggleClass("active", true);
        this.#linesDisplayed = true;
        $("#linesContainer").show();
    }

    /**
     * Hide the lines div
     */
    hideLines() {
        $("#linesContainer").toggleClass("displayNone", true);
        $("#displayLinesBtn").toggleClass("active", false);
        this.#linesDisplayed = false;
        $("#linesContainer").hide();
    }

    /**
     * Show the upload div
     */
    displayUploadOptions() {
        $("#uploadContainer").toggleClass("displayNone", false);
        $("#uploadOptionsbtn").toggleClass("active", true);
        this.#uploadOptionsDisplayed = true;
        $("#uploadContainer").show();
    }

    /**
     * Hide the upload div
     */
    hideUploadOptions() {
        $("#uploadContainer").toggleClass("displayNone", true);
        $("#uploadOptionsbtn").toggleClass("active", false);
        this.#uploadOptionsDisplayed = false;
        $("#uploadContainer").hide();
    }

    /**
     * Show the save div
     */
    displaySaveOptions() {
        $("#saveContainer").toggleClass("displayNone", false);
        $("#saveOptionsbtn").toggleClass("active", true);
        this.#saveOptionsDisplayed = true;
        $("#saveContainer").show();
    }

    /**
     * Hide the save div
     */
    hideSaveOptions() {
        $("#saveContainer").toggleClass("displayNone", true);
        $("#saveOptionsbtn").toggleClass("active", false);
        this.#saveOptionsDisplayed = false;
        $("#saveContainer").hide();
    }
}

export default new InfoService();
