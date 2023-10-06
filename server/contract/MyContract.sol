// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        string certificateId; // Unique ID for the certificate
        string email; // Email of the recipient
        string recipient; // Name of the recipient
        string course; // Course name
        string issueDate; // Timestamp of certificate issuance
    }

    mapping(string => Certificate) public certificateSet;

    // Function to add a certificate to the set
    function addCertificate(
        string memory certificateId,
        string memory email,
        string memory recipient,
        string memory course,
        string memory issueDate
    ) public {
        certificateSet[certificateId] = Certificate({
            certificateId: certificateId,
            email: email,
            recipient: recipient,
            course: course,
            issueDate: issueDate
        });
    }

    // Function to check if a certificate exists in the set
    function checkCertificate(
        string memory certificateID
    ) public view returns (bool) {
        return
            !(bytes(certificateSet[certificateID].certificateId).length == 0);
    }

    // Function to get a certificate from the set
    function getCertificate(
        string memory certificateID
    ) public view returns (Certificate memory) {
        return certificateSet[certificateID];
    }
}
