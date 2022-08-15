#include <site.hpp>

ACTION site::uploadbegin(name scope, uint64_t key, string& fname, string& type, string& format, uint32_t fsize, string& attri, string& originators, uint16_t resalefee, string& hash, string& code) {
  require_auth(scope);

  // Init the table
  IndexTable _indexTable(get_self(), scope.value);

  // Find the entry
  auto itr = _indexTable.find(key);
  check(itr == _indexTable.end(), "This entry is not available.");

  // Add to table
  _indexTable.emplace(scope, [&](auto& p) {
    p.key = key;
    p.attri = attri;
    p.fname = fname;
    });
}

ACTION site::uploadnext(name scope, uint64_t key, vector<Ref>& refs, string& code) {
  require_auth(scope);

  // Init the table
  IndexTable _indexTable(get_self(), scope.value);

  // Find the entry
  auto itr = _indexTable.find(key);
  check(itr != _indexTable.end(), errorTableKey);

  const Ref* last = &refs[0];
  Ref* old;
  int refsSize = refs.size();
  if (refsSize > 1) {
    old = &refs[1];
    check(old->Block <= last->Block, errorRefHigerOrEven);
    if (refsSize > 2) {
      Ref* first = &refs[2];
      check(itr->refs[1].Block <= first->Block && itr->refs[1].TrxId <= first->TrxId, errorFirstNotMatch);
    }
  }

  // Modify table
  _indexTable.modify(itr, eosio::same_payer, [&](auto& p) {
    switch (itr->refs.size()) {
    case 0:
      // Store the ref to the first transaction
      p.refs.push_back(*last);
      break;
    case 1:
      // Add the ref to the last transaction in the front of the vector
      // The second entry will then be a ref to the first transaction 
      check(refsSize > 1, errorMissingOldRef);
      check(p.refs[0].TrxId == old->TrxId && p.refs[0].Block == old->Block, errorOldNotMatch);
      p.refs.insert(p.refs.begin(), 1, *last);
      break;
    case 2:
      // Update first entry with a ref to the last transaction
      // The second entry keeps a ref to the first transaction
      check(refsSize > 1, errorMissingOldRef);
      check(p.refs[0].TrxId == old->TrxId && p.refs[0].Block == old->Block, errorOldNotMatch);
      p.refs[0] = *last;
      break;
    default:
      check(false, errorContractToManyRefs);
      return;
    }
    });
}

ACTION site::updateref(name scope, uint64_t key, vector<Ref>& refs) {
  require_auth(scope);

  const Ref& last = refs[0];
  const Ref& old = refs[1];
  check(old.Block <= last.Block, errorRefHigerOrEven);

  // Init the table
  IndexTable _indexTable(get_self(), scope.value);

  // Find the entry
  auto itr = _indexTable.find(key);
  check(itr != _indexTable.end(), errorTableKey);

  // Modify table
  _indexTable.modify(itr, eosio::same_payer, [&](auto& p) {
    switch (itr->refs.size()) {
    case 0:
      // The whole data is already attached at the first transaction
      // Store the ref only to the first transaction
      p.refs.push_back(last);
      break;
    case 1:
      // The file is only split into two transactions 
      // Add the ref to the last transaction in the front of the vector
      // The second entry will then be a ref to the first transaction
      check(p.refs[0].TrxId == old.TrxId && p.refs[0].Block == old.Block, errorOldNotMatch);
      p.refs.insert(p.refs.begin(), 1, last);
      break;
    case 2:
      // The file is split into more than two transactions
      check(p.refs[0].TrxId == old.TrxId && p.refs[0].Block == old.Block, errorOldNotMatch);
      p.refs[0] = last;
      break;
    default:
      check(false, errorContractToManyRefs);
      return;
    }
    });
}

ACTION site::deleteentry(name scope, uint64_t key) {
  check(has_auth(scope) || has_auth(get_self()), errorUserNotAuth);

  IndexTable _indexTable(get_self(), scope.value);

  // Delete the entry in _indexTable table
  auto itr = _indexTable.find(key);
  check(itr != _indexTable.end(), errorTableKey);
  _indexTable.erase(itr);
}

ACTION site::clearscope(name scope) {
  check(has_auth(scope) || has_auth(get_self()), errorUserNotAuth);

  IndexTable _indexTable(get_self(), scope.value);

  // Delete all entries in _indexTable table
  auto itr = _indexTable.begin();
  while (itr != _indexTable.end()) {
    itr = _indexTable.erase(itr);
  }
}

ACTION site::changekey(name scope, uint64_t key, uint64_t newkey) {
  require_auth(scope);

  check(key != newkey, "The keys are identical.");

  // Init the tables
  IndexTable _indexTable(get_self(), scope.value);

  // Find the entry
  auto itr = _indexTable.find(key);
  check(itr != _indexTable.end(), errorTableKey);

  auto itrnew = _indexTable.find(newkey);
  check(itrnew == _indexTable.end(), "This new entry is not available.");

  // Add entry with new key
  _indexTable.emplace(scope, [&](auto& p) {
    p.key = newkey;
    p.refs = itr->refs;
    p.attri = itr->attri;
    p.fname = itr->fname;
    });

  // Delete old entry
  _indexTable.erase(itr);
}

ACTION site::setref(name scope, uint64_t key, string& fname, vector<Ref> refs, string attri) {
  require_auth(scope);

  // Init the table
  IndexTable _indexTable(get_self(), scope.value);

  // Find the entry
  auto itr = _indexTable.find(key);
  check(itr == _indexTable.end(), "This entry is not available.");

  if (refs.size() > 1 && refs[0].TrxId != refs[1].TrxId) {
    check(refs[1].Block >= refs[0].Block, "Reffered block has to be higher or even to old first reffered block.");
  }

  // Add to table
  _indexTable.emplace(scope, [&](auto& p) {
    p.key = key;
    p.refs = refs;
    p.attri = attri;
    p.fname = fname;
    });
}