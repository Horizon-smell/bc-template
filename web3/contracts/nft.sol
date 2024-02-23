// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import '@openzeppelin/contracts/token/common/ERC2981.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

contract NFT is ERC721, ERC2981, ERC721Enumerable, AccessControl {
    using Strings for uint256;
    string public baseURI;
    bytes32 MINTER_ROLE = keccak256('MINTER_ROLE');

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) ERC721(_name, _symbol) {
        baseURI = _baseURI;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setRoleAdmin(MINTER_ROLE, DEFAULT_ADMIN_ROLE);
        _setDefaultRoyalty(msg.sender, 1000);
    }

    uint256 public tokenIdCounter;

    function mint(address _to) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _safeMint(_to, tokenIdCounter++);
    }

    function changeURI(string memory _newURI) public onlyRole(DEFAULT_ADMIN_ROLE) {
        baseURI = _newURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns(string memory)
    {
        return getURI(tokenId);
    }
    
    function getURI(uint256 _tokenId)
        public
        view
        returns(string memory)
    {
        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165, ERC721, ERC721Enumerable, ERC2981, AccessControl)
        returns (bool)
    {
        return interfaceId == type(IERC721Enumerable).interfaceId ||
        interfaceId == type(ERC2981).interfaceId ||
        super.supportsInterface(interfaceId);
    }
}