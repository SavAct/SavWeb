#include "tables.hpp"

using namespace std;
using namespace eosio;

CONTRACT site : public contract {

  public:
    using contract::contract;

    #define errorTableKey "There is no entry with this key."
    #define errorOldNotMatch "Old reffered transaction doesn't match the last reffered transaction."
    #define errorRefHigerOrEven "Reffered block has to be higher or even to old reffered block."
    #define errorUserNotAuth "User is not authorized to perform this action."
    #define errorFirstNotMatch "First reffered transaction doesn't match."
    #define errorContractToManyRefs "Contract Error: There are more than two refrences."
    #define errorMissingOldRef "Missing old reference."

    /** 
     * First transaction to start the upload of a file. Additional parameters will be used to verify the files with the browser.
     * @param scope Scope of the entry
     * @param key Index key of the entry
     * @param fname File name
     * @param type Type of the file
     * @param format Enryption format
     * @param fsize Amount of bytes of the complete file
     * @param attri Otional attributes of the file
     * @param originators All originators with their share. (Prefixes define the type of a share and originator reference)
     * @param resalefee This is the amount of fee which will granted to the originators by considering the share of each originator. Fee = (max value of uint16_t) / resalefee.
     * @param hash The hash of the file as byte array
     * @param code The first byte section of the file
    */
    ACTION uploadbegin(name scope, uint64_t key, string& fname, string& type, string& format, uint32_t fsize, string& attri, string& originators, uint16_t resalefee, string& hash, string& code);

    /**
     * Upload the next file snipped
     * @param scope Scope of the entry
     * @param key Index key of the entry
     * @param refs refs[0] is a reference to last transaction and refs[1] a reference to the old last transaction
     * @param code The next byte section of the file
    */
    ACTION uploadnext(name scope, uint64_t key, vector<Ref>& refs, string& code);

    /**
     * Update the references in the RAM to the very last transaction
     * @param scope Scope of the entry
     * @param key Index key of the entry
     * @param refs refs[0] is a reference to last transaction and refs[1] a reference to the old last transaction
    */
    ACTION updateref(name scope, uint64_t key, vector<Ref>& refs);

    /**
     * Delete an entry. This can be performed by the scope or owner of the contract
     * @param scope The scope of the entry
     * @param key The index key of the entry
    */
    ACTION deleteentry(name scope, uint64_t key);

    /**
     * Delete a whole scope. This can be performed by the scope or owner of the contract
     * @param scope The scope which will be deleted
    */
    ACTION clearscope(name scope);

    /**
     * Change the index key of an entry
     * @param scope The scope of the entry
     * @param key The index key of the entry
     * @param newkey The new index key
    */
    ACTION changekey(name scope, uint64_t key, uint64_t newkey);

    /**
     * Functions without any checking or table entry. They are just to upload a file with a minimum need of CPU
    */
    ACTION minbegin(name scope, uint64_t key, string& fname, string& type, string& format, uint32_t fsize, string& attri, string& originators, uint16_t resalefee, string& hash, string& code){}
    ACTION minnext(name scope, uint64_t key, Ref& ref, string& code){}
    ACTION minend(name scope, uint64_t key, Ref& ref, Ref& fref, string& code){}

    /**
     * Emplace the reference of an already uploaded file in a table
     * @param scope Scope of the entry
     * @param key Index key of the entry
     * @param refs refs[0] is a reference to last transaction and refs[1] a reference to the first transaction if it differs from refs[0]
     * @param attri Optional attributes of the file
    */
    ACTION setref(name scope, uint64_t key, string& fname, vector<Ref> refs, string attri);

  private:
};
